import getPortalConfig from '../../methods/chl/v1/getPortalConfig';

const resolvers = {
  Query: {
    getConfig: async (_root, { rollbar }) => getPortalConfig({ rollbar }),
  },
};

export default { resolvers };
