import axios from 'axios';
import headers from '../../../../helpers/headers';
import { PATH_ENDPOINT_SIMULATION } from '../../../../config';

const { CORE_URL } = process.env;

export default async ({ data, rollbar }) => {
  try {
    const response = await axios.post(`${CORE_URL}${PATH_ENDPOINT_SIMULATION}`, data.simulation, { headers });
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
