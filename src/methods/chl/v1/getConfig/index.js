import { ConfigModel } from '../../../../helpers/modelsExport';

export default async ({ rollbar }) => {
  try {
    const config = await ConfigModel.findOne();
    return config;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
