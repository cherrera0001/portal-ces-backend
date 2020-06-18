const axios = require('axios');
const { ApolloError } = require('apollo-server-express');
const headers = require('../../../../helpers/headers');
const { PATH_ENDPOINT_SAVE_SIMULATION } = require('../../../../config');

const { CORE_URL } = process.env;

export default async ({ data, rollbar }) => {
  try {
    const response = await axios.post(`${CORE_URL}${PATH_ENDPOINT_SAVE_SIMULATION}`, data.simulation, { headers });
    if (response.status !== 200) {
      throw new ApolloError(response.statusText, 'ERROR_SAVING_SIMULATION');
    }
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/saveSimulation::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
