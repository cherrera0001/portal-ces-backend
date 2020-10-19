const LoansApplication = require('amices/models/loanApplications.model');
const errors = require('amices/errors');
const findLoanStatus = require('eficar/helpers/findLoanStatus');

const updateStatus = async (req, res) => {
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, status } = req.body.message.data;

  const loan = await LoansApplication.findOne({ simulationId: +loanApplicationId });
  if (!loan) return errors.badRequest(res, `Loan ${loanApplicationId} not found to be updated`);

  loan.status = await findLoanStatus(status);
  loan.awardedTime = new Date();
  await loan.save();
  req.app.socketIo.emit(`RELOAD_DOCUMENTS_TO_SIGN_AMICES_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  return res.status(200).json();
};

module.exports = { updateStatus };
