const { ApolloError } = require('apollo-server-express');
const AuctionParticipantsModel = require('amices/models/auctionParticipants.model');

module.exports = async ({ data, rollbar }) => {
  try {
    if (!data.loanApplicationId) throw new Error('MISSING_LOAN_ID');
    const { loanApplicationId } = data;
    const loan = await AuctionParticipantsModel.findOne({ loanApplicationId });
    if (!loan) throw new Error('LOAN_ID_NOT_FOUND');
    const winner = loan.auctionParticipants.find((el) => el.status === 'WINNER');
    if (!winner) throw new Error('WINNER_NOT_FOUND');
    if (!winner.Checklists) throw new Error('WINNER_CHECKLISTS_NOT_FOUND');

    return {
      financingEntityId: winner.FinancingEntity.id,
      checklistId: winner.Checklists[0].id,
      checklistError: winner.Checklists[0].comment,
      status: loan.status,
      checklist: winner.Checklists[0].ChecklistItems.map((item) => ({
        id: item.id,
        name: item.CoreParam.name,
        value: item.value,
        step: item.status,
      })),
    };
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getCheckList/index::ERROR: ${err.message}`);
    if (err.message === 'MISSING_LOAN_ID') throw new ApolloError('Missing loanId field.', 'MISSING_LOAN_ID');
    throw new Error(err.message);
  }
};
