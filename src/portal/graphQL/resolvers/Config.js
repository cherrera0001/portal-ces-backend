const getConfig = require('portal/methods/chl/v1/getConfig');

const resolvers = {
  Query: {
    getConfig: async (_root, { rollbar }) => getConfig({ rollbar }),
  },
};

module.exports = { resolvers };
