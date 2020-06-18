const { PortalConfigModel } = require('../../../../helpers/modelsExport');

export default async ({ data, rollbar }) => {
  try {
    const config = await PortalConfigModel.find();
    return config;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
