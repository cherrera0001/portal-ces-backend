const axios = require('axios');
const { CoreParamsModel } = require('portal/helpers/modelsExport');
const headers = require('portal/helpers/headers');
const { PATH_ENDPOINT_CORE_PARAMS } = require('portal/core.services');

const { CORE_URL } = process.env;

module.exports = async ({ rollbar }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${CORE_URL}${PATH_ENDPOINT_CORE_PARAMS}`,
      headers,
    });

    await CoreParamsModel.remove();
    await CoreParamsModel.insertMany(response.data);
    return 'done';
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
