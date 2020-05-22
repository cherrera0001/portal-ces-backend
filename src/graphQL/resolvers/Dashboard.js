import dashboard from '../../methods/chl/v1/dashboard';

const resolvers = {
  Query: {
    dashboard: async (_root, arg, { rollbar }) => dashboard({ data: arg, rollbar }),
  },
};

export default { resolvers };
