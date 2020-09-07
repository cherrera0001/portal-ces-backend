const Configs = require('amices/models/configs.model');

module.exports = async (req, res, next) => {
  const config = await Configs.findOne();
  if (req.body.message.data.token === config.coreToken) return next();
  res.status(401).end();
};
