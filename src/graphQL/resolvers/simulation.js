import getSimulation from '../../methods/chl/v1/simulation';
import getCoreParams from "../../methods/chl/v1/getCoreParams";

const resolvers = {
  Query: {
    Simulation: async (_root, arg, { rollbar }) => getSimulation({ data: arg, rollbar }),
  },
};

export default { resolvers };
