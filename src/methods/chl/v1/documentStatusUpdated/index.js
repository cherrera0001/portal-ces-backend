import { CHECKLIST_DOCUMENT_UPDATED } from '../../../../graphQL/events';

export default async ({ data, pubsub }) => {
  return pubsub.asyncIterator(`${CHECKLIST_DOCUMENT_UPDATED}.${data.loanId}`);
};
