const getPortalConfig = require('portal/methods/chl/v1/getPortalConfig');

const resolvers = {
  Query: {
    getConfig: async (_root, { rollbar }) => getPortalConfig({ rollbar }),
  },
};

module.exports = { resolvers };
