import getCheckList from '../../methods/chl/v1/getCheckList';
import uploadDocuments from '../../methods/chl/v1/uploadDocuments';
import updateDocumentStatus from '../../methods/chl/v1/updateDocumentStatus';
import documentStatusUpdated from '../../methods/chl/v1/documentStatusUpdated';

const resolvers = {
  Query: {
    getCheckList: async (_root, arg, { rollbar }) => getCheckList({ data: arg, rollbar }),
  },
  Mutation: {
    uploadDocuments: async (_root, arg, { rollbar }) => uploadDocuments({ data: arg, rollbar }),
    updateDocumentStatus: async (_root, arg, { pubsub, rollbar }) =>
      updateDocumentStatus({ data: arg, pubsub, rollbar }),
  },
  Subscription: {
    documentStatusUpdated: {
      subscribe: async (_root, arg, { pubsub }) => documentStatusUpdated({ data: arg, pubsub }),
    },
  },
};

export default { resolvers };
