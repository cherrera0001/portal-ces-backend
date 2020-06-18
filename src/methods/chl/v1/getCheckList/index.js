const axios = require('axios');
const { ApolloError } = require('apollo-server-express');
const { LoansModel } = require('../../../../helpers/modelsExport');
const { getCheckListQuery } = require('../../../../graphQL/queries/getCheckList');
const { PATH_CORE_ENDPOINT_GQL } = require('../../../../config');

const { CORE_URL } = process.env;

const getCheckList = async (loanId) => {
  return axios({
    method: 'post',
    url: `${CORE_URL}${PATH_CORE_ENDPOINT_GQL}`,
    data: getCheckListQuery(loanId),
  });
};

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
