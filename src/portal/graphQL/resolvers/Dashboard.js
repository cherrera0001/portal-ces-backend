const dashboard = require('portal/methods/chl/v1/dashboard');

const resolvers = {
  Query: {
    dashboard: async (_root, arg, { rollbar }) => dashboard({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
