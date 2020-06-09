import axios from 'axios';
import headers from '../../../../helpers/headers';

const { CORE_URL } = process.env;

export default async ({ data, rollbar }) => {
  try {
    const response = await axios.post(`${CORE_URL}/chl/v1/email`, data, { headers });
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/sendEmail::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
