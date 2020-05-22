import axios from 'axios';

export default async ({ rollbar }) => {
  try {
    return 'ok';
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
