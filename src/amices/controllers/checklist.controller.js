const rollbar = require('rollbar.js');
const AuctionParticipantsModel = require('amices/models/auctionParticipant.model');
const Params = require('amices/controllers/params.controller');

const parseMessage = (message) => JSON.parse(Buffer.from(message, 'base64').toString());

const update = async (req, res) => {
  try {
    if (!req.body.message.data) throw Error();
    const incomeData = parseMessage(req.body.message.data);
    console.log(`>>>>>> checklist update incoming message for (${incomeData.loanApplicationId}) loan auction <<<<<<`);

    const { loanApplicationId, feIdentificationValue, checkList } = incomeData;

    const auction = await AuctionParticipantsModel.findOne({
      loanApplicationId: +loanApplicationId,
    });

    if (!auction) {
      throw new Error(`Auction ${loanApplicationId} not found for update`);
    }

    for (const participant of auction.auctionParticipants) {
      if (participant.FinancingEntity.identificationValue === feIdentificationValue) {
        const newCheckListItems = [];

        for (const item of checkList.checkListItems) {
          newCheckListItems.push({
            ...item,
            ...(item.value && { value: item.value }),
            uuid: item.uuid ? JSON.parse(item.uuid).map(({ uuid }) => uuid) : null,
            status: item.newStatus,
            CoreParam: await Params.getOne({ type: 'CHECKLIST', id: item.coreParamId }),
          });
        }

        participant.Checklists[0].ChecklistItems = newCheckListItems;
      }
    }

    auction.markModified('auctionParticipants');
    await auction.save();
    req.app.socketIo.emit(`RELOAD_AUCTION_${loanApplicationId}`);
    return res.status(200).json();
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionStart::ERROR: ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { update };
