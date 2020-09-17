const LoansApplication = require('amices/models/loanApplications.model');
const errors = require('amices/errors');

const updateStatus = async (req, res) => {
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, status } = req.body.message.data;

  const loan = await LoansApplication.findOne({ simulationId: +loanApplicationId });
  if (!loan) return errors.badRequest(res, `Loan ${loanApplicationId} not found to be updated`);

  loan.status = status;
  await loan.save();
  req.app.socketIo.emit(`RELOAD_DOCUMENTS_TO_SIGN_AMICES_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_DOCUMENTS_TO_SIGN_${loanApplicationId}`);
  return res.status(200).json();
};

module.exports = { updateStatus };
