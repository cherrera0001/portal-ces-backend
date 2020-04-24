import getConfig from '../../methods/chl/v1/getConfig';

const resolvers = {
  Query: {
    getFileUploadingConfig: async (_root, { rollbar }) => getConfig({ rollbar }),
  },
};

export default { resolvers };
