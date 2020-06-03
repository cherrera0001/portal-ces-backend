import getSimulation from '../../methods/chl/v1/simulation';
import getSimulationById from '../../methods/chl/v1/simulation/getSimulationById';
import sendEmail from '../../methods/chl/v1/simulation/sendEmail';
import saveSimulation from '../../methods/chl/v1/simulation/saveSimulation';

const resolvers = {
  Query: {
    Simulation: async (_root, arg, { rollbar }) => getSimulation({ data: arg, rollbar }),
    getSimulationById: async (_root, arg, { rollbar }) => getSimulationById({ data: arg, rollbar }),
  },
  Mutation: {
    sendEmail: async (_root, arg, { rollbar }) => sendEmail({ data: arg, rollbar }),
    saveSimulation: async (_root, arg, { rollbar }) => saveSimulation({ data: arg, rollbar }),
  },
};

export default { resolvers };
