const axios = require('axios');
const headers = require('portal/helpers/headers');

module.exports = async ({ data, rollbar }) => {
  try {
    // GET LOAN APPLICATION FROM DB
    return true;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/getSimulationById::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
