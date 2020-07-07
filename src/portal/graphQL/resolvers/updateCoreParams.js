const updateParams = require('portal/methods/chl/v1/updateCoreParams');

const resolvers = {
  Query: {
    updateCoreParams: async (_root, arg, { rollbar }) => updateParams({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
