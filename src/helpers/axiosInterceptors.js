import axios from 'axios';
import mongoose from 'mongoose';

// import saveLogsApi from './saveLogsApi';

axios.interceptors.request.use(
  (config) => {
    config.requestId = mongoose.Types.ObjectId().toHexString();
    saveLogsApi({ ...config, requestBody: JSON.stringify(config.data) });
    return config;
  },
  (error) => error,
);

// axios.interceptors.response.use(
//   (response) => {
//     saveLogsApi({
//       ...response.config,
//       responseBody: JSON.stringify(response.data),
//     });
//     return response;
//   },
//   (error) => {
//     saveLogsApi({
//       ...error.config,
//       responseBody: `ERROR: ${JSON.stringify(error.response.data)}`,
//     });
//     return Promise.reject(error);
//   },
// );
