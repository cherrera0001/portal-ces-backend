const AuctionParticipants = require('amices/models/auctionParticipants.model');
const LoansApplication = require('amices/models/loanApplications.model');
const Params = require('amices/controllers/params.controller');
const errors = require('amices/errors');
const findLoanStatus = require('amices/helpers/findLoanStatus');

const start = async (req, res) => {
  // This function is called when a loanApplication is submited to auction.
  if (!req.body.message.data) return errors.badRequest(res);
  const incomingData = req.body.message.data;

  const auction = await AuctionParticipants.findOne({
    loanApplicationId: incomingData.loanApplicationId,
  });

  if (auction) return errors.badRequest(res, `Auction ${incomingData.loanApplicationId} already exist in the database`);

  const newAuction = new AuctionParticipants(incomingData);
  await newAuction.save();

  const loan = await LoansApplication.findOne({
    simulationId: incomingData.loanApplicationId,
  });

  loan.status = await findLoanStatus('FORMALIZED_REQUEST');
  await loan.save();
  return res.status(201).json();
};

const responses = async (req, res) => {
  /**
   * This function is called when a FE sends a response to the core with a status (APPROVED, REJECTED, EXPIRED) for a given auction.
   * This function should not update the auction status if a winner is already registered, unless there is a new winner in the incoming request.
   */
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, auctionParticipants } = req.body.message.data;

  const auction = await AuctionParticipants.findOne({ loanApplicationId });
  if (!auction) return errors.badRequest(res, `Auction ${loanApplicationId} not found to be updated`);

  const winnerAlreadyPresent = auction.auctionParticipants.find((participant) => participant.status === 'WINNER');
  if (winnerAlreadyPresent) {
    const incomingStatusForWinner = auctionParticipants.find((el) => el.id === winnerAlreadyPresent.id);
    if (incomingStatusForWinner && incomingStatusForWinner.status !== 'WINNER') {
      const incomingWinner = auctionParticipants.find((participant) => participant.status === 'WINNER');
      if (!incomingWinner) return res.status(200).json();
    }
  }

  for (const participant of auctionParticipants) {
    let newCheckListItems = [];

    if (participant.Checklists[0]) {
      for (const item of participant.Checklists[0].ChecklistItems) {
        newCheckListItems.push({
          ...item,
          CoreParam: await Params.getOne({ type: 'CHECKLIST', id: item.coreParamId }),
        });
      }

      newCheckListItems = newCheckListItems.sort((a, b) => a.CoreParam.name.localeCompare(b.CoreParam.name));
      participant.Checklists[0].ChecklistItems = newCheckListItems;
    }
  }

  auction.auctionParticipants = auctionParticipants;

  await auction.save();
  req.app.socketIo.emit(`RELOAD_AUCTION_${loanApplicationId}`);
  return res.status(200).json();
};

const finish = async (req, res) => {
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, status } = req.body.message.data;

  const auction = await AuctionParticipants.findOne({ loanApplicationId });
  if (!auction) return errors.badRequest(res, `Auction ${loanApplicationId} not found to be finished`);
  if (
    (status === 'GRANTED' && !auction.status) ||
    (status === 'GRANTED' && auction.status.code === 'FORMALIZED_REQUEST')
  )
    return res.status(400).json();

  auction.status = await findLoanStatus(status);
  await auction.save();

  const loan = await LoansApplication.findOne({
    simulationId: loanApplicationId,
  });

  loan.status = await findLoanStatus(status);
  await loan.save();

  req.app.socketIo.emit(`RELOAD_AUCTION_${loanApplicationId}`);
  req.app.socketIo.emit(`RELOAD_EFICAR_AUCTION_${loanApplicationId}`);
  return res.status(200).json();
};

const get = async (req, res) => {
  const auction = await AuctionParticipants.find({
    loanApplicationId: req.params.loanId,
    $or: [
      { 'status.code': 'FINISHED_AUCTION' },
      { 'status.code': 'GRANTED' },
      { 'status.code': 'CHECKLIST_CONFIRMED' },
      { 'status.code': 'CHECKLIST_VALIDATION' },
      { 'status.code': 'SIGNING' },
      { 'status.code': 'AWARDED' },
    ],
  });
  return res.status(200).json(auction);
};

module.exports = { start, responses, finish, get };
