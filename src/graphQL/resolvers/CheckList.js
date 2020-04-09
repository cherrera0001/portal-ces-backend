import getCheckList from '../../methods/chl/v1/getCheckList';
import uploadDocuments from '../../methods/chl/v1/uploadDocuments';

const resolvers = {
  Query: {
    getCheckList: async (_root, arg, { rollbar }) => {
      try {
        const response = await getCheckList({ data: arg, rollbar });
        return response;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Mutation: {
    uploadDocuments: async (_root, arg, { rollbar }) => {
      try {
        const response = await uploadDocuments({ data: arg, rollbar });
        return response;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

export default { resolvers };
