const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const Auction = require('eficar/models/auction.model');
const Config = require('eficar/models/config.model');
const findLoanStatus = require('eficar/helpers/findLoanStatus');
const errors = require('eficar/errors');
const HTTP = require('requests');
const {
  PATH_ENDPOINT_CORE_SEND_FE_RESPONSE,
  PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT,
  PATH_ENDPOINT_CORE_DOCUMENT_STATUS,
} = require('eficar/core.services');

const { CORE_URL } = process.env;

const customerTypeMap = {
  RUC: 'PJ',
  DNI: 'PN',
};

const loanStatusMap = {
  AP: 'APPROVED',
  CA: 'CONDITIONED',
  RA: 'REJECTED',
};

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const auctions = await Auction.find({ ...filter, ...{ financingEntityId: req.user.companyIdentificationValue } })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Auction.find(filter).select(projection);

  res.json({
    total: total.length,
    result: auctions,
  });
};

const getCustomerHistory = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });

  const auctions = await Auction.find({ 'customer.identificationValue': req.params.rut })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Auction.find(filter).select(projection);

  res.json({
    total: total.length,
    result: auctions,
  });
};

const getCompleteItems = async (items) => {
  const checklistItems = [];

  for (const item of items) {
    const completeItem = await Params.getOne({
      type: 'CHECKLIST',
      externalCode: item.checklistId,
    });

    checklistItems.push({
      coreParamId: completeItem.id,
      checklistId: item.checklistId,
      name: completeItem.name,
      ...(item.value && { value: item.value }),
    });
  }

  return checklistItems;
};

const checklist = async (req, res) => {
  const { skip, limit, sort, projection, population } = aqp({ ...req.query });
  const { stage } = req.params;
  const { loanSimulationDataId } = req.params;
  const loanSimulationData = await Auction.findOne({ 'loanSimulationData.id': loanSimulationDataId })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  if (!loanSimulationData) return errors.notFound(res);

  const identificationType = await Params.getOne({
    type: 'IDENTIFICATION_TYPE',
    externalCode: loanSimulationData.customer.identificationTypeId,
  });

  const customerTypeCode = customerTypeMap[identificationType.name];

  const checklistType = await Params.getOne({ type: 'CHECKLIST_TYPE', externalCode: stage });

  const checklistCustomertType = await Params.getOne({
    type: 'CHECKLIST_CUSTOMER_TYPE',
    parentId: checklistType.id,
    externalCode: customerTypeCode,
  });

  const checklistWorkingType = await Params.getOne({
    type: 'CHECKLIST_WORK_TYPE',
    parentId: checklistCustomertType.id,
    externalCode: loanSimulationData.customerActivity.workType.externalCode,
  });

  const checklist = await Params.get({
    type: 'CHECKLIST',
    parentId: checklistWorkingType.id,
  });

  checklist.push(
    checklist.splice(
      checklist.findIndex((el) => el.name === 'Otros'),
      1,
    )[0],
  );

  res.json({
    result: checklist,
  });
};

const get = async (req, res) => {
  let auction = await Auction.findOne({
    simulationId: req.params.id,
    financingEntityId: req.user.companyIdentificationValue,
  });

  if (!auction) return errors.notFound(res);

  if (auction.loanStatus.code === 'SIMULATION_SENT') {
    auction.loanStatus = await findLoanStatus('EVALUATION_IN_PROCESS');
  }

  const config = await Config.findOne({});
  auction.riskAnalyst = req.user;
  await auction.save();

  auction = auction.toObject();
  auction.minimumRate = config.minimumRate;

  res.json({
    result: auction,
  });
};

const sendResponse = async (req, res) => {
  const { feResponseStatus } = req.body;
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_SEND_FE_RESPONSE}`, {
    ...req.body,
    feIdentificationValue: req.user.companyIdentificationValue,
  });

  if (response.status !== 200) return errors.badRequest(res);

  const checklistItems = await getCompleteItems(req.body.checklistItems);
  const auction = await Auction.findOneAndUpdate(
    {
      simulationId: req.body.loanSimulationDataId,
      financingEntityId: req.user.companyIdentificationValue,
    },
    {
      $set: {
        loanStatus: await findLoanStatus(loanStatusMap[feResponseStatus]),
        checkListSent: {
          checklistItems,
          sentAt: new Date(),
        },
      },
    },
  );

  await auction.save();
  res.status(201).end();
};

const auctionUpdate = async (req, res) => {
  const { loanSimulationDataId, feResponseStatus, proposeBaseRate, checklistItems } = req.body;
  const auction = await Auction.findOne({ simulationId: loanSimulationDataId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  const lockedStatus = ['APPROVED', 'REJECTED', 'CONDITIONED'];
  const newStatus = await findLoanStatus(loanStatusMap[feResponseStatus]);

  if (lockedStatus.includes(auction.loanStatus.code)) return res.status(201).end();
  const completeChecklistItems = await getCompleteItems(checklistItems);

  auction.loanStatus = newStatus;
  auction.checkListSent = { checklistItems: completeChecklistItems, proposeBaseRate, sentAt: new Date() };
  auction.save();
  res.status(201).end();
};

const auctionGranted = async (req, res) => {
  const { status, loanSimulationDataId } = req.body;
  const auction = await Auction.findOne({ simulationId: loanSimulationDataId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  const statusToSet = status === 'WINNER' ? status : 'LOSER';
  auction.finalLoanStatus = await findLoanStatus(statusToSet);
  auction.save();
  res.status(201).end();
};

const checklistReception = async (req, res) => {
  if (!req.body) return errors.badRequest(res);

  for (const item of req.body) {
    const { loanSimulationDataId, checklistId, coreParamId, uuids, status } = item;
    const auction = await Auction.findOne({ simulationId: loanSimulationDataId, financingEntityId: req.params.rut });
    if (!auction) return errors.notFound(res);

    auction.checkListSent.checklistId = checklistId;

    for (const document of auction.checkListSent.checklistItems) {
      if (document.coreParamId === coreParamId) {
        document.uuids = uuids;
        document.status = status;
      }
    }

    auction.markModified('checkListSent');
    await auction.save();
    req.app.socketIo.emit(`RELOAD_EFICAR_${loanSimulationDataId}`);
  }
  res.status(201).end();
};

const checklistConfirmation = async (req, res) => {
  const { loanApplicationId, checklistOperation, checklistId, checklistItemId, uuids } = req.body;
  // revisar checklistOperation rechazo, aprobacion

  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  auction.checkListSent.checklistId = checklistId;

  for (const item of auction.checkListSent.checklistItems) {
    if (item.checklistId === checklistItemId) item.uuids = uuids;
  }

  auction.markModified('checkListSent');
  await auction.save();
  res.status(201).end();
};

const documentStatus = async (req, res) => {
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DOCUMENT_STATUS}`, {
    ...req.body,
    feIdentificationValue: req.user.companyIdentificationValue,
  });

  if (response.status !== 200) return errors.badRequest(res);

  res.json({
    ...response.data,
  });
};

const downloadDocument = async (req, res) => {
  const { loanSimulationDataId, checklistId, uuid } = req.body;
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_DOWNLOAD_DOCUMENT}`, {
    loanSimulationDataId,
    checklistId,
    uuid,
  });

  if (response.status !== 200) return errors.badRequest(res);

  res.json({
    ...response.data,
  });
};

const create = async (req, res) => {
  const {
    loanSimulationData: { id: simulationId, status },
  } = req.body;

  const auction = new Auction({
    ...req.body,
    financingEntityId: req.params.rut,
    simulationId,
    loanStatus: await findLoanStatus(status),
  });
  await auction.save();
  res.status(201).end();
};

module.exports = {
  all,
  get,
  create,
  getCustomerHistory,
  downloadDocument,
  checklist,
  sendResponse,
  auctionUpdate,
  auctionGranted,
  documentStatus,
  checklistReception,
  checklistConfirmation,
};
