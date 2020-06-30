const LoansApplication = require('portal/models/mg/LoansApplication');

const create = async (req, res) => {
  const loansApplication = new LoansApplication({ ...req.body });
  loansApplication.save();
  res.status(201).end();
};

const all = async (req, res) => {
  const loansApplication = await LoansApplication.find();
  res.json(loansApplication);
};

module.exports = { all, create };
