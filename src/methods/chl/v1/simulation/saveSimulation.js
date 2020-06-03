import axios from 'axios';
import { ApolloError } from 'apollo-server-express';
import headers from '../../../../helpers/headers';

const { CORE_URL } = process.env;

export default async ({ data, rollbar }) => {
  try {
    let response = {};
    await axios
      .post(`${CORE_URL}/chl/v1/simulation/save`, data.simulation, { headers })
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        throw new ApolloError(err.response.statusText, 'ERROR_SAVING_SIMULATION');
      });
    return response;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/saveSimulation::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
