import updateParams from '../../methods/chl/v1/updateCoreParams';

const resolvers = {
  Query: {
    updateCoreParams: async (_root, arg, { rollbar }) => updateParams({ data: arg, rollbar }),
  },
};

export default { resolvers };
