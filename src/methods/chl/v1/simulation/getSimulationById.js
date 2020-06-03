import axios from 'axios';
import { ApolloError } from 'apollo-server-express';

const { CORE_URL } = process.env;

export default async ({ data, rollbar }) => {
  try {
    return true;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/getSimulationById::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
