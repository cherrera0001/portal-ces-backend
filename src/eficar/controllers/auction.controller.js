const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const Auction = require('eficar/models/auction.model');
const Config = require('eficar/models/config.model');
const findLoanStatus = require('eficar/helpers/findLoanStatus');
const errors = require('eficar/errors');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_SEND_FE_RESPONSE } = require('eficar/core.services');

const { CORE_URL } = process.env;

const customerTypeMap = {
  RUC: 'PJ',
  DNI: 'PN',
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
  const { feResponseStatus, checklistItems } = req.body;
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_CORE_SEND_FE_RESPONSE}`, {
    ...req.body,
    feIdentificationValue: req.user.companyIdentificationValue,
  });

  if (response.status !== 200) return errors.badRequest(res);

  let status = '';
  if (feResponseStatus === 'RA') status = 'REJECTED';
  if (feResponseStatus === 'AP') status = 'APPROVED';
  if (feResponseStatus === 'CA') status = 'CONDITIONED';

  const auction = await Auction.findOneAndUpdate(
    {
      simulationId: req.body.loanSimulationDataId,
      financingEntityId: req.user.companyIdentificationValue,
    },
    {
      $set: {
        loanStatus: await findLoanStatus(status),
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
  const { loanApplicationId, status, proposedBaseRate, checkListItems } = req.body;

  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.id });

  if (!auction) return errors.notFound(res);

  const lockedStatus = ['APPROVED', 'REJECTED', 'CONDITIONED'];
  const newStatus = await findLoanStatus(status);

  if (lockedStatus.includes(newStatus.code)) return res.status(201).end();

  auction.loanStatus = newStatus;
  auction.checkListSent = { checkListItems, proposedBaseRate, sentAt: new Date() };
  auction.save();
  res.status(201).end();
};

const auctionGranted = async (req, res) => {
  const { status, loanApplicationId } = req.body;

  const auction = await Auction.findOne({ simulationId: loanApplicationId, financingEntityId: req.params.id });
  if (!auction) return errors.notFound(res);

  const statusToSet = status === 'WINNER' ? status : 'LOSER';
  auction.finalLoanStatus = await findLoanStatus(statusToSet);
  auction.save();
  res.status(201).end();
};

const create = async (req, res) => {
  const { id, status } = req.body;
  const auction = new Auction({
    ...req.body,
    simulationId: id,
    financingEntityId: req.params.rut,
    loanStatus: await findLoanStatus(status),
  });
  auction.save();
  res.status(201).end();
};

module.exports = { all, get, create, getCustomerHistory, checklist, sendResponse, auctionUpdate, auctionGranted };
