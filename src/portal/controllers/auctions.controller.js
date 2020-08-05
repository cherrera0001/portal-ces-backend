const rollbar = require('rollbar.js');
const AuctionParticipantsModel = require('portal/models/auctionParticipant.model');
const LoansApplicationModel = require('portal/models/loansApplication.model');

const parseMessage = (message) => JSON.parse(Buffer.from(message, 'base64').toString());

const start = async (req, res) => {
  try {
    if (!req.body.message.data) throw Error();
    const incomeData = parseMessage(req.body.message.data);
    console.log(`>>>>>> auctionStart incoming message for (${incomeData.loanApplicationId}) loan auction <<<<<<`);
    const auctionParticipants = new AuctionParticipantsModel({
      ...incomeData,
      simulationId: incomeData.loanApplicationId,
    });
    await auctionParticipants.save();
    return res.status(200).json();
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionStart::ERROR: ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
};

const responses = async (req, res) => {
  try {
    if (!req.body.message.data) throw Error();
    const incomeData = parseMessage(req.body.message.data);
    console.log(`>>>>>> auctionResponses incoming message for (${incomeData.loanApplicationId}) loan auction <<<<<<`);
    const auctionParticipants = await AuctionParticipantsModel.findOne({
      loanApplicationId: +incomeData.loanApplicationId,
    });
    if (!auctionParticipants) {
      throw new Error(`Auction ${incomeData.loanApplicationId} not found for update`);
    }
    auctionParticipants.auctionParticipants = incomeData.auctionParticipants;
    await auctionParticipants.save();
    req.app.socketIo.emit(`RELOAD_AUCTION_${incomeData.loanApplicationId}`);
    return res.status(200).json();
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionResponses::ERROR: ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
};

const finish = async (req, res) => {
  try {
    if (!req.body.message.data) throw Error();
    const incomeData = parseMessage(req.body.message.data);
    console.log(`>>>>>> auctionFinish incoming message for (${incomeData.loanApplicationId}) loan auction <<<<<<`);
    const loansApplication = await LoansApplicationModel.findOne({ simulationId: incomeData.loanApplicationId });
    if (!loansApplication) {
      throw new Error(`Loan application ${incomeData.loanApplicationId} not found`);
    }
    loansApplication.status = incomeData.status;
    await loansApplication.save();
    return res.status(200).json();
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionFinish::ERROR: ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { start, responses, finish };
