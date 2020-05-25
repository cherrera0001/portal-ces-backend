import {CoreParamsModel} from '../../../../helpers/modelsExport';

export default async ({ data, rollbar }) => {
  try {
    const coreParams = await CoreParamsModel.find({type: data.type});
    return coreParams;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getConfig/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
