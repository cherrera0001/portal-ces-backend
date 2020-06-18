const axios = require('axios');
const { CoreParamsModel } = require('../../../../helpers/modelsExport');
const headers = require('../../../../helpers/headers');
const { PATH_ENDPOINT_CORE_PARAMS } = require('../../../../config');

const { CORE_URL } = process.env;

export default async ({ rollbar }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${CORE_URL}${PATH_ENDPOINT_CORE_PARAMS}`,
      headers,
    });

    response.data.map(async (param) => {
      if (!(await CoreParamsModel.findOne({ id: param.id, name: param.name }))) {
        await CoreParamsModel.create(param);
      }
    });
    return 'done';
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
