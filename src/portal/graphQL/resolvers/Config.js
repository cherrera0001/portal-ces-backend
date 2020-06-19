const getConfig = require('portal/methods/chl/v1/getConfig');

const resolvers = {
  Query: {
    getFileUploadingConfig: async (_root, { rollbar }) => getConfig({ rollbar }),
  },
};

module.exports = { resolvers };
