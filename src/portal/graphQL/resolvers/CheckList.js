const getCheckList = require('portal/methods/chl/v1/getCheckList');
const uploadDocuments = require('portal/methods/chl/v1/uploadDocuments');
const updateDocumentStatus = require('portal/methods/chl/v1/updateDocumentStatus');
const documentStatusUpdated = require('portal/methods/chl/v1/documentStatusUpdated');

const resolvers = {
  Query: {
    getCheckList: async (_root, arg, { rollbar }) => getCheckList({ data: arg, rollbar }),
  },
  Mutation: {
    uploadDocuments: async (_root, arg, { rollbar }) => uploadDocuments({ data: arg, rollbar }),
    // updateDocumentStatus: async (_root, arg, { pubsub, rollbar }) =>
    //   updateDocumentStatus({ data: arg, pubsub, rollbar }),
  },
};

module.exports = { resolvers };
