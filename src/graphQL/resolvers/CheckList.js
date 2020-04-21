import getCheckList from '../../methods/chl/v1/getCheckList';
import uploadDocuments from '../../methods/chl/v1/uploadDocuments';

const resolvers = {
  Query: {
    getCheckList: async (_root, arg) => getCheckList(arg),
  },
  Mutation: {
    uploadDocuments: async (_root, arg, { rollbar }) => uploadDocuments({ data: arg, rollbar }),
  },
};

export default { resolvers };
