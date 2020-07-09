const { ApolloError } = require('apollo-server-express');
const AuctionParticipantsModel = require('portal/models/mg/AuctionParticipants');

module.exports = async ({ data, rollbar }) => {
  try {
    if (!data.loanApplicationId) throw new Error('MISSING_LOAN_ID');
    const { loanApplicationId } = data;
    const loan = await AuctionParticipantsModel.findOne({ loanApplicationId });
    return loan;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getCheckList/index::ERROR: ${err.message}`);
    if (err.message === 'MISSING_LOAN_ID') throw new ApolloError('Missing loanId field.', 'MISSING_LOAN_ID');
    throw new Error(err.message);
  }
};
