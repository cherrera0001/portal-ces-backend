const { CHECKLIST_DOCUMENT_UPDATED } = require('../../../../graphQL/events');

export default async ({ data, pubsub }) => {
  return pubsub.asyncIterator(`${CHECKLIST_DOCUMENT_UPDATED}.${data.loanId}`);
};
