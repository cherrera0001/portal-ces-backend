const { CoreParamsModel } = require('portal/helpers/modelsExport');

module.exports = async ({ data, rollbar }) => {
  try {
    const coreParams = await CoreParamsModel.find({
      ...data,
      ...(data.externalCode && { externalCode: { $in: data.externalCode } }),
    }).sort('name');
    return coreParams;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
