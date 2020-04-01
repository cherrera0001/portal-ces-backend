import getCheckList from '../../methods/chl/v1/getCheckList';

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
};

export default { resolvers };
