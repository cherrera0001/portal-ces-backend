const AuctionParticipants = require('amices/models/auctionParticipants.model');
const errors = require('amices/errors');

const start = async (req, res) => {
  // This function is called when a loanApplication is submited to auction.
  if (!req.body.message.data) return errors.badRequest(res);
  const incomingData = req.body.message.data;

  const auction = await AuctionParticipants.findOne({
    loanApplicationId: incomingData.loanApplicationId,
  });

  if (auction) return errors.badRequest(`Auction ${incomingData.loanApplicationId} already exist in the database`);

  const newAuction = new AuctionParticipants(incomingData);
  await newAuction.save();
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
  if (!auction) return errors.badRequest(`Auction ${loanApplicationId} not found to be updated`);

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
  auction.status = status;
  await auction.save();
  req.app.socketIo.emit(`RELOAD_AUCTION_${loanApplicationId}`);
  return res.status(200).json();
};

module.exports = { start, responses, finish };
