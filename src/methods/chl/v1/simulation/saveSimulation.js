import axios from 'axios';
import { ApolloError } from 'apollo-server-express';
import headers from '../../../../helpers/headers';

const { CORE_URL } = process.env;

export default async ({ data, rollbar }) => {
  try {
    const response = await axios.post(`${CORE_URL}/chl/v1/simulation/save`, data.simulation, { headers });
    if (response.status !== 200) {
      throw new ApolloError(response.statusText, 'ERROR_SAVING_SIMULATION');
    }
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/saveSimulation::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
