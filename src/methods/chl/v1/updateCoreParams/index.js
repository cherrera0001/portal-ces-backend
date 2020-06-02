import { CoreParamsModel } from '../../../../helpers/modelsExport';
const axios = require('axios');

export default async ({ rollbar }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': 'f2fb29d5831f44598bd634938685186b',
    };
    const response = await axios({
      method: 'GET',
      url: `http://localhost:8080/chl/v1/core-params`,
      headers,
    });
    await CoreParamsModel.insertMany(response.data);
    return 'done';
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
