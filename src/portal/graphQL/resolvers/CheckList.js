const getCheckList = require('portal/methods/chl/v1/getCheckList');
const uploadDocuments = require('portal/methods/chl/v1/uploadDocuments');

const resolvers = {
  Mutation: {
    uploadDocuments: async (_root, arg, { rollbar }) => uploadDocuments({ data: arg, rollbar }),
    getCheckList: async (_root, arg, { rollbar }) => getCheckList({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
