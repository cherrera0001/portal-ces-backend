import getCoreParams from '../../methods/chl/v1/getCoreParams';
import getCoreParamsLists from '../../methods/chl/v1/getCoreParams/lists';

const resolvers = {
  Query: {
    getCoreParams: async (_root, arg, { rollbar }) => getCoreParams({ data: arg, rollbar }),
    getCoreParamsLists: async (_root, arg, { rollbar }) => getCoreParamsLists({ data: arg, rollbar }),
  },
};

export default { resolvers };
