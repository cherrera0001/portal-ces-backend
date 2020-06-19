import axios from 'axios';
import { CoreParamsModel } from '../../../../helpers/modelsExport';
import headers from '../../../../helpers/headers';
import { PATH_ENDPOINT_CORE_PARAMS } from '../../../../config';

const { CORE_URL } = process.env;

export default async ({ rollbar }) => {
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
