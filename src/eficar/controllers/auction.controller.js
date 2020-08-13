const aqp = require('api-query-params');
const Params = require('eficar/controllers/params.controller');
const Auction = require('eficar/models/auction.model');
const findLoanStatus = require('eficar/helpers/findLoanStatus');
const errors = require('eficar/errors');

const customerTypeMap = {
  'R.U.N': 'PJ',
  'R.U.T': 'PN',
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
    id: loanSimulationData.customer.identificationTypeId,
  });

  const customerTypeCode = customerTypeMap[identificationType.externalCode];

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

  res.json({
    result: checklist,
  });
};

const get = async (req, res) => {
  const auction = await Auction.findOne({
    simulationId: req.params.id,
    financingEntityId: req.user.companyIdentificationValue,
  });

  if (!auction) return errors.notFound(res);

  const loanStatus = await findLoanStatus('EVALUATION_IN_PROCESS');

  auction.riskAnalyst = req.user;
  auction.loanStatus = loanStatus;
  await auction.save();

  res.json({
    result: auction,
  });
};

const create = async (req, res) => {
  const auction = new Auction({
    ...req.body,
    simulationId: req.body.loanSimulationData.id,
    financingEntityId: req.params.rut,
    loanStatus: await findLoanStatus(req.body.loanSimulationData.status),
  });
  auction.save();
  res.status(201).end();
};

module.exports = { all, get, create, getCustomerHistory, checklist };
