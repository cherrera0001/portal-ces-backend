const AuctionParticipants = require('amices/models/auctionParticipants.model');
const LoansApplication = require('amices/models/loanApplications.model');
const Params = require('amices/controllers/params.controller');
const errors = require('amices/errors');
const findLoanStatus = require('amices/helpers/findLoanStatus');

const update = async (req, res) => {
  // This function is called when a checklist item changes its status by being approved, rejected or downloaded
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, feIdentificationValue, checkList, comment, status } = req.body.message.data;
  const auction = await AuctionParticipants.findOne({ loanApplicationId });
  if (!auction) return errors.badRequest(res, `Auction ${loanApplicationId} not found for checklist items info update`);

  for (const participant of auction.auctionParticipants) {
    if (participant.FinancingEntity.identificationValue === feIdentificationValue) {
      let newCheckListItems = [];

      for (const item of checkList.checkListItems) {
        newCheckListItems.push({
          ...item,
          ...(item.value && { value: item.value }),
          uuid: item.uuid ? JSON.parse(item.uuid).map(({ uuid }) => uuid) : null,
          CoreParam: await Params.getOne({ type: 'CHECKLIST', id: item.coreParamId }),
          status: item.newStatus,
        });
      }
      newCheckListItems = newCheckListItems.sort((a, b) => a.CoreParam.name.localeCompare(b.CoreParam.name));
      participant.Checklists[0].ChecklistItems = newCheckListItems;
      participant.Checklists[0].comment = comment;
      break;
    }
  }

  if (status) {
    const newLoanStatus = await findLoanStatus(status);
    auction.status = newLoanStatus;

    const loanApplication = await LoansApplication.findOne({ simulationId: loanApplicationId });
    if (loanApplication) {
      loanApplication.status = newLoanStatus;
      await loanApplication.save();
    }
  }

  auction.markModified('auctionParticipants');
  await auction.save();
  req.app.socketIo.emit(`RELOAD_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_LIST_${feIdentificationValue}`);
  return res.status(200).json();
};

module.exports = { update };
