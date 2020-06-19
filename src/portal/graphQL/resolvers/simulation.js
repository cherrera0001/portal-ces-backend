const getSimulation = require('portal/methods/chl/v1/simulation');
const sendEmail = require('portal/methods/chl/v1/simulation/sendEmail');
const saveSimulation = require('portal/methods/chl/v1/simulation/saveSimulation');

const resolvers = {
  Query: {
    Simulation: async (_root, arg, { rollbar }) => getSimulation({ data: arg, rollbar }),
  },
  Mutation: {
    sendEmail: async (_root, arg, { rollbar }) => sendEmail({ data: arg, rollbar }),
    saveSimulation: async (_root, arg, { rollbar }) => saveSimulation({ data: arg, rollbar }),
  },
};

module.exports = { resolvers };
