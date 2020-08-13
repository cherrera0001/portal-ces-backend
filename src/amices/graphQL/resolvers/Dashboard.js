const dashboard = require('amices/methods/chl/v1/dashboard');

const resolvers = {
  Query: {
    dashboard: async (_root, arg, { rollbar }) => dashboard({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
