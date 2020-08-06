const aqp = require('api-query-params');
const Params = require('eficar/models/params.model');
const Auction = require('eficar/models/auction.model');
const { query } = require('express');
const { flatMap } = require('lodash');
const status = {
  DRAFT_SIMULATION: 'No Accesada',
};

const customerTypeMap = {
  'R.U.N': 'PJ',
  'R.U.T': 'PN',
};
const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  console.log(filter);
  const auctions = await Auction.find(filter)
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
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });

  let stage = req.params.stage;
  let loanSimulationDataId = req.params.loanSimulationDataId;
  let loanSimulationData = await Auction.findOne({ 'loanSimulationData.id': loanSimulationDataId })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  let identificationType = await Params.findOne({
    type: 'IDENTIFICATION_TYPE',
    id: loanSimulationData.customer.identificationTypeId,
  })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  let customerTypeCode = customerTypeMap[identificationType.externalCode];
  let checklistType = await Params.findOne({ type: 'CHECKLIST_TYPE', externalCode: stage })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  let checklistCustomertType = await Params.findOne({
    type: 'CHECKLIST_CUSTOMER_TYPE',
    parentId: checklistType.id,
    externalCode: customerTypeCode,
  })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  let checklistWorkingType = await Params.findOne({
    type: 'CHECKLIST_WORK_TYPE',
    parentId: checklistCustomertType.id,
    externalCode: loanSimulationData.customerActivity.workType.externalCode,
  })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  let checklist = await Params.find({
    type: 'CHECKLIST',
    parentId: checklistWorkingType.id,
  })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  res.json({
    result: checklist,
  });
};
const get = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });

  const auctions = await Auction.find({ simulationId: req.params.id })
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

const create = async (req, res) => {
  //Se mapea estado hay que buscar una mejor forma de hacerlo
  req.body.status = status[req.body.status];
  req.body.loanSimulationData.status = status[req.body.loanSimulationData.status];

  const auction = new Auction({ ...req.body, simulationId: req.body.loanSimulationData.id });
  auction.save();
  res.status(201).end();
};

module.exports = { all, get, create, getCustomerHistory, checklist };
