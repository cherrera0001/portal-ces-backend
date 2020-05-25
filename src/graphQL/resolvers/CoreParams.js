import getCoreParams from '../../methods/chl/v1/getCoreParams';
import getCheckList from "../../methods/chl/v1/getCheckList";

const resolvers = {
  Query: {
    getCoreParams: async (_root, arg, { rollbar }) => getCoreParams({ data: arg, rollbar }),
  },
};

export default { resolvers };
