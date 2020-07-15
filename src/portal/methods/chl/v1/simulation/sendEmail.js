const HTTP = require('http');
const { PATH_ENDPOINT_EMAIL } = require('portal/core.services');

const { CORE_URL } = process.env;

module.exports = async ({ data, rollbar }) => {
  try {
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_EMAIL}`, data);
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/sendEmail::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
