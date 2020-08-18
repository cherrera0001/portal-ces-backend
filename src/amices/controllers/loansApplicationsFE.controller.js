const aqp = require('api-query-params');
const LoansApplicationFE = require('amices/models/loansApplicationFE.model');
const LoansApplication = require('amices/models/loansApplication.model');

const errors = require('amices/errors');

const create = async (req, res) => {
  const loanApplication = await LoansApplication.findOne({
    'loanSimulationData.id': req.body.loanSimulationData.id,
  });

  if (!loanApplication) {
    return errors.notFound(res);
  }

  const exists = await LoansApplicationFE.findOne({
    'loanSimulationData.id': req.body.loanSimulationData.id,
    'loanSimulationData.financingEntityId': req.body.loanSimulationData.financingEntityId,
  });
  if (exists) {
    return errors.badRequest(res, 'loanSimulationDataFE already exists');
  }
  const loanApplicationFE = new LoansApplicationFE({ ...req.body });
  loanApplicationFE.loansApplication = loanApplication;
  await loanApplicationFE.save();
  res.status(201).end();
};

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const loansApplicationsFE = await LoansApplicationFE.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await LoansApplicationFE.find(filter).select(projection);

  res.json({
    total: total.length,
    result: loansApplicationsFE,
  });
};

module.exports = { all, create };
