const AmicesParams = require('amices/models/coreParams.model');
const EficarParams = require('eficar/models/params.model');
const aqp = require('api-query-params');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_PARAMS } = require('eficar/core.services');

const { CORE_URL } = process.env;

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const params = await AmicesParams.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await AmicesParams.find(filter).select(projection);

  res.json({
    total: total.length,
    result: params,
  });
};

const updateFromCore = async (req, res) => {
  try {
    const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_PARAMS}`);

    await AmicesParams.deleteMany();
    await EficarParams.deleteMany();
    await AmicesParams.insertMany(response.data);
    await EficarParams.insertMany(response.data);
    res.status(201).end();
  } catch (err) {
    res.status(400).end();
  }
};

module.exports = { all, updateFromCore };
