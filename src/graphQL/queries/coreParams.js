const getCoreParamsQuery = () => ({
  operationName: 'getCoreParams',
  query: `
    query getCoreParams($type: String!) {
      getCoreParams(type: $type) {
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

export { getCoreParamsQuery };
