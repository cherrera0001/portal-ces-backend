import { LoansModel } from '../../../../helpers/modelsExport';

export default async ({ data, rollbar }) => {
  try {
    const loan = await LoansModel.findOne({ loanId: data.loanId });
    return loan;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getCheckList/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
