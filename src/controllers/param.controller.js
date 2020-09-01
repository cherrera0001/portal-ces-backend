const Param = require('amices/models/coreParams.model');
const aqp = require('api-query-params');

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const params = await Param.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Param.find(filter).select(projection);

  res.json({
    total: total.length,
    result: params,
  });
};

module.exports = { all };
