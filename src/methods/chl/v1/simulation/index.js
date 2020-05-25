import axios from 'axios';

export default async ({ data, rollbar }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': 'f2fb29d5831f44598bd634938685186b',
    };
    let response = ''
    await axios
      .post(`https://api.core.staging.amicar.com/chl/v1/simulation/`, data.simulation, { headers })
      .then((res) => {
        console.log(res.data)
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
