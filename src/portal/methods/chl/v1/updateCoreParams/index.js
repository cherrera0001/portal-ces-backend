const CoreParamsModel = require('portal/models/coreParams.model');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_PARAMS } = require('portal/core.services');

const { CORE_URL } = process.env;

module.exports = async () => {
  try {
    const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_PARAMS}`);
    await CoreParamsModel.deleteMany();
    await CoreParamsModel.insertMany(response.data);
    return 'done';
  } catch (err) {
    throw new Error(err.message);
  }
};
