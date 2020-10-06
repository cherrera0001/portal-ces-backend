const Config = require('eficar/models/configs.model');

const get = async (req, res) => {
  const config = await Config.findOne({}).select('allowedFileTypes allowedMimeTypes maxFileSizeInKB');

  res.json(config);
};

module.exports = {
  get,
};
