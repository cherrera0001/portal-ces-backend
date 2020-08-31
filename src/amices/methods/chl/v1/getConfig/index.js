const Configs = require('amices/models/configs.model');

module.exports = async ({ rollbar }) => {
  try {
    const config = await Configs.findOne();
    return config;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
