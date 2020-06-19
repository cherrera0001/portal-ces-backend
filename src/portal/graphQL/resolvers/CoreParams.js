const getCoreParams = require('portal/methods/chl/v1/getCoreParams');

const resolvers = {
  Query: {
    getCoreParams: async (_root, arg, { rollbar }) => getCoreParams({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
