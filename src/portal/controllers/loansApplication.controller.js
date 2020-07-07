const aqp = require('api-query-params');
const LoansApplication = require('portal/models/mg/LoansApplication');

const create = async (req, res) => {
  const loansApplication = new LoansApplication({ ...req.body });
  loansApplication.save();
  res.status(201).end();
};

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const loansApplications = await LoansApplication.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await LoansApplication.find(filter).select(projection);

  res.json({
    total: total.length,
    result: loansApplications,
  });
};

const status = async (req, res) => {
  const loansApplication = await LoansApplication.findById(req.params.id);
  res.json(loansApplication);
};

module.exports = { all, create, status };
