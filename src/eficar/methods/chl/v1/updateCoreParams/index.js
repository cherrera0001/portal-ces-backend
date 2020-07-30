const CoreParamsModel = require('eficar/models/params.model');
const HTTP = require('requests');
const { PATH_ENDPOINT_CORE_PARAMS } = require('eficar/core.services');

const { CORE_URL } = process.env;

module.exports = async () => {
  try {
    const response = await HTTP.get(`${CORE_URL}${PATH_ENDPOINT_CORE_PARAMS}`);
    await CoreParamsModel.remove();
    await CoreParamsModel.insertMany(response.data);
    return 'done';
  } catch (err) {
    throw new Error(err.message);
  }
};
