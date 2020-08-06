const aqp = require('api-query-params');
const Params = require('eficar/models/params.model');
const updateParams = require('eficar/methods/chl/v1/updateCoreParams');
const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  console.log(filter);
  const params = await Params.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Params.find(filter).select(projection);

  res.json({
    total: total.length,
    result: params,
  });
};

const updateFromCore = async (req, res) => {
  await updateParams();
  res.status(201).end();
};

const getOne = async (filter) => {
  const response = await Params.findOne(filter);
  return response;
};

const get = async (filter) => {
  const response = await Params.find(filter);
  return response;
};
module.exports = { all, updateFromCore, getOne, get };
