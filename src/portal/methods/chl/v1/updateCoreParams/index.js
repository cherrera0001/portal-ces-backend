const CoreParamsModel = require('portal/models/coreParams.model');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_PARAMS } = require('portal/core.services');

const { CORE_URL } = process.env;

module.exports = async ({ rollbar }) => {
  try {
    const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_PARAMS}`);
    await CoreParamsModel.remove();
    await CoreParamsModel.insertMany(response.data);
    return 'done';
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
