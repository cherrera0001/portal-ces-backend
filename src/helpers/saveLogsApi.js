const LogRequestAPI = require('models/logRequestAPI.model');
const rollbar = require('../rollbar');

module.exports = async (req) => {
  const { url, requestBody, responseBody, method, headers, requestId } = req;
  const newLogData = {
    action: `${method}: ${url}`,
    headers,
    requestId,
    requestBody: requestBody || '',
    responseBody: responseBody || '',
  };
  try {
    await LogRequestAPI.create(newLogData);
  } catch (err) {
    rollbar.log(`src/helpers/saveLogsApi::ERROR: ${err.message}`);
  }
};
