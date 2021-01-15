const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const Auction = require('eficar/models/auctions.model');
const Config = require('eficar/models/configs.model');
const findLoanStatus = require('eficar/helpers/findLoanStatus');
const errors = require('eficar/errors');
const HTTP = require('requests');

const { PATH_ENDPOINT_CORE_SEND_FE_RESPONSE } = require('eficar/core.services');

const { CORE_URL } = process.env;

const loanStatusMap = {
  AP: 'APPROVED',
  CA: 'CONDITIONED',
  RA: 'REJECTED',
};

const INTERMEDIATE_STATUS = ['SAVED_SIMULATION'];

const all = async (req, res) => {
  const recordsPerPage = 20;
  const currentPage = req.params.page - 1;
  const { filter, skip, sort, projection, population } = aqp({
    ...req.query,
    skip: currentPage * recordsPerPage,
  });

  const auctions = await Auction.find({ ...filter, ...{ financingEntityId: req.user.companyIdentificationValue } })
    .skip(skip)
    .limit(recordsPerPage)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Auction.find({ ...filter, ...{ financingEntityId: req.user.companyIdentificationValue } }).select(
    projection,
  );

  res.json({
    total: Math.ceil(total.length / recordsPerPage),
    result: auctions,
  });
};

const getCustomerHistory = async (req, res) => {
  const recordsPerPage = 10;
  const currentPage = req.params.page - 1;
  const { skip, sort, projection, population, filter } = aqp({
    ...req.query,
    skip: currentPage * recordsPerPage,
  });

  const auctions = await Auction.find({
    'customer.identificationValue': req.params.rut,
    financingEntityId: req.user.companyIdentificationValue,
    ...filter,
  })
    .skip(skip)
    .limit(recordsPerPage)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Auction.find({
    'customer.identificationValue': req.params.rut,
    financingEntityId: req.user.companyIdentificationValue,
  }).select(projection);

  res.json({
    total: Math.ceil(total.length / recordsPerPage),
    result: auctions,
  });
};

const getCompleteItems = async (items) => {
  const checklistItems = [];

  for (const item of items) {
    const completeItem = await Params.getOne({
      type: 'CHECKLIST',
      id: item.coreParamId,
    });

    checklistItems.push({
      ...item,
      name: completeItem.name,
      status: item.status,
      externalCode: completeItem.externalCode,
    });
  }

  return checklistItems;
};

const get = async (req, res) => {
  let auction = await Auction.findOne({
    simulationId: req.params.id,
    financingEntityId: req.user.companyIdentificationValue,
  });

  if (!auction) return errors.notFound(res);

  if (auction.loanStatus.code === 'SIMULATION_SENT') {
    const evaluationInProcessStatus = await findLoanStatus('EVALUATION_IN_PROCESS');
    auction.loanStatus = evaluationInProcessStatus;
    auction.finalLoanStatus = evaluationInProcessStatus;
  }

  if (auction.loanStatus.code === 'SIMULATION_SENT' || auction.loanStatus.code === 'EVALUATION_IN_PROCESS') {
    const shouldRefreshList = auction.riskAnalyst ? auction.riskAnalyst.rut !== req.user.rut : true;
    auction.riskAnalyst = req.user;
    await auction.save();
    if (shouldRefreshList) req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_LIST_${req.user.companyIdentificationValue}`);
  }

  if (auction.checkListSent && auction.hasUnseenDocumentsUploaded) auction.hasUnseenDocumentsUploaded = false;

  const config = await Config.findOne({});

  await auction.save();

  auction = auction.toObject();
  auction.minimumRate = config.minimumRate;

  res.json({
    result: auction,
  });
};

const sendResponse = async (req, res) => {
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_SEND_FE_RESPONSE}`, {
    ...req.body,
    feIdentificationValue: req.user.companyIdentificationValue,
  });

  if (response.status !== 200) return errors.badRequest(res);
  res.status(201).end();
};

const update = async (req, res) => {
  const { loanApplicationId, feResponseStatus, proposeBaseRate, checklistItems } = req.body;
  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  const lockedStatus = ['APPROVED', 'REJECTED', 'CONDITIONED'];
  if (!lockedStatus.includes(auction.loanStatus.code) && feResponseStatus) {
    auction.loanStatus = await findLoanStatus(loanStatusMap[feResponseStatus]);
  }

  const completeChecklistItems = await getCompleteItems(checklistItems);
  auction.checkListSent = { checklistItems: completeChecklistItems, proposeBaseRate, sentAt: new Date() };
  auction.hasUnseenDocumentsUploaded = true;
  auction.markModified('checkListSent');
  await auction.save();
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_LIST_${req.params.rut}`);
  res.status(200).end();
};

const granted = async (req, res) => {
  // defines the final status for this FE
  const { status, loanSimulationDataId: loanApplicationId } = req.body;
  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  const finalLoanStatus = status === 'APPROVED' ? 'LOSER' : status;

  auction.finalLoanStatus = await findLoanStatus(finalLoanStatus);

  if (status === 'CHECKLIST_REJECTED') {
    // makes sure the checklist items are shown as rejected even if they were approved before the complete checklist rejection
    const items = auction.checkListSent.checklistItems;
    auction.checkListSent = { ...auction.checkListSent, checklistItems: items.map((item) => ({ ...item, status: 5 })) };
    auction.markModified('checkListSent');
  }
  if (status === 'AWARDED') auction.awardedTime = new Date();
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_LIST_${req.params.rut}`);

  await auction.save();
  res.status(200).end();
};

const create = async (req, res) => {
  const {
    loanSimulationData: { id: simulationId, status },
  } = req.body;

  const spouseData =
    Object.keys(req.body.spouseData).length > 6
      ? {
          ...req.body.spouseData,
          spouseGeographicDataId: req.body.spouseData.spouseGeographicData.COMMUNE.externalCode,
          workType: req.body.spouseData.workType.externalCode,
          activityType: req.body.spouseData.activityType.externalCode,
        }
      : {};
  const buyForAnother =
    Object.keys(req.body.buyForAnother).length > 0
      ? {
          ...req.body.buyForAnother,
          geographicDataId: req.body.buyForAnother.geographicData.COMMUNE.externalCode,
          nationalityId: req.body.buyForAnother.nationalityData.externalCode,
          maritalStatus: req.body.buyForAnother.maritalStatusData.externalCode,
          maritalRegime: req.body.buyForAnother.maritalRegimeData.externalCode,
        }
      : {};

  const guarantor = req.body.guarantor.length
    ? req.body.guarantor.map((el) => ({
        ...el,
        geographicDataId: el.geographicData.COMMUNE.externalCode,
        nationalityId: el.nationalityData.externalCode,
        maritalStatus: el.maritalStatusData.externalCode,
        maritalRegime: el.maritalRegimeData.externalCode,
        workType: el.workTypeData.externalCode,
        activityTypeId: el.activityTypeData.externalCode,
      }))
    : [];

  const loanStatus = await findLoanStatus(status);

  const auction = new Auction({
    ...req.body,
    spouseData,
    buyForAnother,
    guarantor,
    financingEntityId: req.params.rut,
    simulationId,
    loanStatus,
    finalLoanStatus: loanStatus,
  });
  await auction.save();
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_LIST_${req.params.rut}`);
  res.status(201).end();
};

const findAllLoanStatus = async (req, res) => {
  const config = await Config.findOne();
  const loanStatus = config.loanStatus.filter((status) => !INTERMEDIATE_STATUS.includes(status.code));
  return res.status(200).json(loanStatus);
};

module.exports = {
  all,
  get,
  create,
  getCustomerHistory,
  sendResponse,
  update,
  granted,
  findAllLoanStatus,
};
