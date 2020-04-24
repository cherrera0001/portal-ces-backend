const getCheckListQuery = (loanId) => ({
  operationName: 'getCheckList',
  variables: { loanId },
  query: `
    query getCheckList($loanId: String!) {
      getCheckList(loanId: $loanId) {
        financingEntityId
        checkList {
          id
          name
          step
          documentType
          wasSent
          feError
        }
      }
    }
  `,
});

export { getCheckListQuery };
