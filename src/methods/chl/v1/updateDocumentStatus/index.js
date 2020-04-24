import { LoansModel } from '../../../../helpers/modelsExport';
import { CHECKLIST_DOCUMENT_UPDATED } from '../../../../graphQL/events';

export default async ({ data, pubsub, rollbar }) => {
  try {
    const { loanId, documentSetId, state } = data;
    const loan = await LoansModel.findOne({ loanId });
    loan.checkList.forEach((document) => {
      if (document.id === documentSetId) {
        document.step = Number(state);
        document.wasSent = true;
      }
    });
    loan.save();

    pubsub.publish(`${CHECKLIST_DOCUMENT_UPDATED}.${loanId}`, {
      documentStatusUpdated: loan,
    });
    return true;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/updateDocumentStatus/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
