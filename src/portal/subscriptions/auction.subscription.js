const rollbar = require('rollbar.js');

const AuctionParticipants = require('portal/models/mg/AuctionParticipants');

const auctionStart = async (message) => {
  try {
    const incomeData = JSON.parse(message.data.toString());
    console.log(`auctionStart incoming message for (${incomeData.loanApplicationId}) loan auction`);
    const auctionParticipants = new AuctionParticipants(incomeData);
    await auctionParticipants.save();
    message.ack();
    return;
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionStart::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

const auctionResponses = async (message) => {
  try {
    const incomeData = JSON.parse(message.data.toString());
    console.log(`auctionResponses incoming message for (${incomeData.loanApplicationId}) loan auction`);
    const auctionParticipants = await AuctionParticipants.findOne({ loanApplicationId: +incomeData.loanApplicationId });
    if (!auctionParticipants) {
      throw new Error(`Auction ${incomeData.loanApplicationId} not found for update`);
    }
    auctionParticipants.auctionParticipants = incomeData.auctionParticipants;
    await auctionParticipants.save();
    message.ack();
    return;
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionResponses::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = { auctionStart, auctionResponses };
