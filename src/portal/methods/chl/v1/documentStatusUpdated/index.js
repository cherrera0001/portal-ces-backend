const { CHECKLIST_DOCUMENT_UPDATED } = require('portal/graphQL/events');

module.exports = async ({ data, pubsub }) => {
  return pubsub.asyncIterator(`${CHECKLIST_DOCUMENT_UPDATED}.${data.loanId}`);
};
