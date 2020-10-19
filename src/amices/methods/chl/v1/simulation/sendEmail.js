const HTTP = require('requests');
const { PATH_ENDPOINT_EMAIL } = require('amices/core.services');

const { CORE_URL } = process.env;

module.exports = async ({ data, rollbar }) => {
  data = {
    ...data,
    downPaymentPercentage: Number(data.downPaymentPercentage).toFixed(2),
  };

  try {
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_EMAIL}`, data);
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/sendEmail::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
