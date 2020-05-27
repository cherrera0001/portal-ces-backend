import getSimulation from '../../methods/chl/v1/simulation';
import sendEmail from '../../methods/chl/v1/simulation/sendEmail';

const resolvers = {
  Query: {
    Simulation: async (_root, arg, { rollbar }) => getSimulation({ data: arg, rollbar }),
  },
  Mutation: {
    sendEmail: async (_root, arg, { rollbar }) => sendEmail({ data: arg, rollbar }),
  },
};

export default { resolvers };
