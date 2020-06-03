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

    response.data.map(async (param) => {
      if (!(await CoreParamsModel.findOne({ id: param.id, name: param.name }))) {
        await CoreParamsModel.create(param);
        console.log(param.name, 'is created!');
      }
    });

    return 'done';
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
