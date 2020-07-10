const getCheckList = require('portal/methods/chl/v1/getCheckList');
const uploadDocuments = require('portal/methods/chl/v1/uploadDocuments');

const resolvers = {
  Query: {
    getCheckList: async (_root, arg, { rollbar }) => getCheckList({ data: arg, rollbar }),
  },
  Mutation: {
    uploadDocuments: async (_root, arg, { rollbar }) => uploadDocuments({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
