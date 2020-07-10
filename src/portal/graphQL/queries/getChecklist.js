const getCheckListQuery = (loanApplicationId) => ({
  operationName: 'getCheckList',
  variables: { loanApplicationId },
  query: `
    query getCheckList($loanApplicationId: Int!) {
      getCheckList(loanApplicationId: $loanApplicationId) {
        checklistId
        financingEntityId
        checklistError
        checklist {
          id
          name
          value
          step
        }
      }
    }
  `,
});

module.exports = { getCheckListQuery };
