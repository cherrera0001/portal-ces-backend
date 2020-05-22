import login from '../../methods/chl/v1/login';
import signUp from '../../methods/chl/v1/signUp';

const resolvers = {
  Mutation: {
    login: async (_root, arg, { rollbar }) => login({ data: arg, rollbar }),
    signUp: async (_root, arg, { rollbar }) => signUp({ data: arg, rollbar }),
  },
};

export default { resolvers };
