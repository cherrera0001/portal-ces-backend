const aqp = require('api-query-params');
const Params = require('amices/models/coreParams.model');

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
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

const getOne = async (filter) => {
  const response = await Params.findOne(filter);
  return response;
};

const get = async (filter) => {
  const response = await Params.find(filter);
  return response;
};

module.exports = { all, getOne, get };
