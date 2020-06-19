const axios = require('axios');
const headers = require('portal/helpers/headers');
const { PATH_ENDPOINT_SIMULATION } = require('portal/core.services');

const { CORE_URL } = process.env;

module.exports = async ({ data, rollbar }) => {
  try {
    const response = await axios.post(`${CORE_URL}${PATH_ENDPOINT_SIMULATION}`, data.simulation, { headers });
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
