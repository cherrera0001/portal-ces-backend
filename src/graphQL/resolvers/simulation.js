import getSimulation from '../../methods/chl/v1/simulation';

const resolvers = {
  Query: {
    getFileUploadingConfig: async (_root, { rollbar }) => getSimulation({ rollbar }),
  },
};

export default { resolvers };
