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
  auction.markModified('checkListSent');
  await auction.save();
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  res.status(200).end();
};

const granted = async (req, res) => {
  // defines the final status for this FE
  const { status, loanSimulationDataId: loanApplicationId } = req.body;
  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.rut });
  if (!auction) return errors.notFound(res);

  auction.finalLoanStatus = await findLoanStatus(status);
  await auction.save();
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  res.status(200).end();
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
  sendResponse,
  update,
  granted,
};
