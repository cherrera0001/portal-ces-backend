const aqp = require('api-query-params');
const Auction = require('eficar/models/auction.model');
const { query } = require('express');
const { flatMap } = require('lodash');
const status = {
  DRAFT_SIMULATION: 'No Accesada',
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

  const auction = new Auction({
    ...req.body,
    simulationId: req.body.loanSimulationData.id,
    financingEntityId: req.params.rut,
  });
  auction.save();
  res.status(201).end();
};

module.exports = { all, get, create, getCustomerHistory };
