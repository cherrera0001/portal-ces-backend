const aqp = require('api-query-params');
const HTTP = require('requests');
const LoansApplication = require('portal/models/loansApplication.model');
const { PATH_ENDPOINT_LOAN_APPLICATION } = require('portal/core.services');

const { CORE_URL } = process.env;

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
  const loansApplication = await LoansApplication.findOne({ simulationId: req.params.id });
  res.json(loansApplication);
};

const save = async (req, res) => {
  await LoansApplication.findOneAndUpdate({ simulationId: req.body.simulationId }, req.body, {
    useFindAndModify: false,
  });
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_LOAN_APPLICATION}`, req.body);
  res.status(response.status).end();
};

module.exports = { all, create, save, status };
