const rollbar = require('rollbar');
const LoansApplicationModel = require('portal/models/mg/LoansApplication');

const simulationSave = async (message) => {
  try {
    const incomeData = JSON.parse(message.data.toString());
    console.log(`>>>>>> simulationSave incoming message for (${incomeData.loanSimulationData.id}) simulation <<<<<<`);
    let simulationObject;
    simulationObject = await LoansApplicationModel.findOne({
      simulationId: +incomeData.loanSimulationData.id,
    });
    if (simulationObject) {
      for (const key of Object.keys(incomeData)) {
        simulationObject[key] = incomeData[key];
      }
      simulationObject.status = incomeData.loanSimulationData.status;
    } else {
      simulationObject = new LoansApplicationModel({
        ...incomeData,
        status: incomeData.loanSimulationData.status,
        simulationId: incomeData.loanSimulationData.id,
      });
    }
    await simulationObject.save();
    message.ack();
    return;
  } catch (err) {
    rollbar.log(`${__dirname}/${__filename} auctionResponses::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};

module.exports = { simulationSave };
