const HTTP = require('requests');
const { PATH_ENDPOINT_SIMULATION } = require('portal/core.services');

const { CORE_URL } = process.env;

module.exports = async ({ data, rollbar }) => {
  try {
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_SIMULATION}`, data.simulation);
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
