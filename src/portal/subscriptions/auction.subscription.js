const rollbar = require('rollbar.js');
// const socket = require('socket.io');

const AuctionParticipantsModel = require('portal/models/mg/AuctionParticipants');
const LoansApplicationModel = require('portal/models/mg/LoansApplication');

const parseMessage = (message) => JSON.parse(message.data.toString());

const auctionStart = async (message, socketIo) => {
  try {
    const incomeData = parseMessage(message);
    console.log(`>>>>>> auctionStart incoming message for (${incomeData.loanApplicationId}) loan auction <<<<<<`);
    const auctionParticipants = new AuctionParticipantsModel({
      ...incomeData,
      simulationId: incomeData.loanApplicationId,
    });
    await auctionParticipants.save();
    message.ack();
    socketIo.emit('test-message', { foo: 'bar' });
    return;
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionStart::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

const auctionResponses = async (message) => {
  try {
    const incomeData = parseMessage(message);
    console.log(`>>>>>> auctionResponses incoming message for (${incomeData.loanApplicationId}) loan auction <<<<<<`);
    const auctionParticipants = await AuctionParticipantsModel.findOne({
      loanApplicationId: +incomeData.loanApplicationId,
    });
    if (!auctionParticipants) {
      throw new Error(`Auction ${incomeData.loanApplicationId} not found for update`);
    }
    auctionParticipants.auctionParticipants = incomeData.auctionParticipants;
    await auctionParticipants.save();
    message.ack();
    // socket.emit('RELOAD_AUCTION');
    return;
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionResponses::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

const auctionFinish = async (message) => {
  try {
    const incomeData = parseMessage(message);
    console.log(`>>>>>> auctionFinish incoming message for (${incomeData.loanApplicationId}) loan auction <<<<<<`);
    const loansApplication = await LoansApplicationModel.findOne({ simulationId: incomeData.loanApplicationId });
    if (!loansApplication) {
      throw new Error(`Loan application ${incomeData.loanApplicationId} not found`);
    }
    loansApplication.status = incomeData.status;
    await loansApplication.save();
    message.ack();
    return;
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionFinish::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = { auctionStart, auctionResponses, auctionFinish };
