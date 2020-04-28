import { ApolloError } from 'apollo-server-express';
import { LoansModel } from '../../../../helpers/modelsExport';

export default async ({ data, rollbar }) => {
  try {
    if (!data.loanId) throw new Error('MISSING_LOAN_ID');
    const { loanId } = data;
    // const response = await getCheckList(loanId);
    // const loan = await new LoansModel(response);
    // loan.save();
    const loan = await LoansModel.findOne({ loanId });
    return loan;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/getCheckList/index::ERROR: ${err.message}`);
    if (err.message === 'MISSING_LOAN_ID') throw new ApolloError('Missing loanId field.', 'MISSING_LOAN_ID');
    throw new Error(err.message);
  }
};
