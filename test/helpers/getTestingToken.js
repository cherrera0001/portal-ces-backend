const Configs = require('amices/models/configs.model');

module.exports = async () => {
  const config = await Configs.findOne();
  return config.testingToken;
};
