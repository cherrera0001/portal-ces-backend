const getConfig = require('amices/methods/chl/v1/getConfig');

const resolvers = {
  Query: {
    getConfig: async (_root, { rollbar }) => getConfig({ rollbar }),
  },
};

module.exports = { resolvers };
