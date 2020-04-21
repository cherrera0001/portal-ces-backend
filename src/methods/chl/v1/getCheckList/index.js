import { ApolloError } from 'apollo-server-express';
import { LoansModel } from '../../../../helpers/modelsExport';

export default async (data) => {
  if (!data.loanId) throw new ApolloError('Missing loanId field.', 'MISSING_LOAN_ID');

  const loan = await LoansModel.findOne({ loanId: data.loanId });
  return loan;
};
