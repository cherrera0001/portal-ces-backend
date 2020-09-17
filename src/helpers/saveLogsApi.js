const LogRequestAPI = require('models/logRequestAPI.model');
const rollbar = require('../rollbar');

module.exports = async ({ request, response = {} }) => {
  const { url = '', method, headers, body = {} } = request;
  if (String(method).toUpperCase() === 'OPTIONS') return;

  try {
    await LogRequestAPI.create({
      url,
      method,
      headers,
      request: body,
      response: JSON.parse(String(response)),
    });
  } catch (err) {
    rollbar.log(`src/helpers/saveLogsApi::ERROR: ${err.message}`);
  }
};
