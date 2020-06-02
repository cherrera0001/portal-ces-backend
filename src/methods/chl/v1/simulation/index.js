import axios from 'axios';
const { CORE_URL, API_KEY_PORTAL} = process.env;

export default async ({ data, rollbar }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY_PORTAL,
    };
    let response = '';
    await axios
      .post(`${CORE_URL}/chl/v1/simulation/`, data.simulation, { headers })
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
