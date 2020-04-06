import { LoansModel } from '../../../../helpers/modelsExport';

export default async ({ rollbar }) => {
  try {
    const loans = await LoansModel.find();
    return loans;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getCheckList/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
