const login = require('portal/methods/chl/v1/login');
const signUp = require('portal/methods/chl/v1/signUp');

const resolvers = {
  Mutation: {
    login: async (_root, arg, { rollbar }) => login({ data: arg, rollbar }),
    signUp: async (_root, arg, { rollbar }) => signUp({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
