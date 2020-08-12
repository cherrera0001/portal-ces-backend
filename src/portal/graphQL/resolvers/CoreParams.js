const getCoreParams = require('portal/methods/chl/v1/getCoreParams');
const getCoreParamsLists = require('portal/methods/chl/v1/getCoreParams/lists');

const resolvers = {
  Query: {
    getCoreParams: async (_root, arg, { rollbar }) => getCoreParams({ data: arg, rollbar }),
    getCoreParamsLists: async (_root, arg, { rollbar }) => getCoreParamsLists({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
