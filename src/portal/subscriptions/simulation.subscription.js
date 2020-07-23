const rollbar = require('rollbar');
const LoansApplication = require('portal/models/loansApplication.model');

const formatLoanApplication = (incomeData) => {
  const loanType = incomeData.loanSimulationData.LoanType.cod;
  const vfg =
    loanType === 'SMART' ? incomeData.amortizationSchedule.find((schedule) => schedule.quotaType === 'SMART') : null;
  const formatedPower = {
    ...incomeData,
    loan: {
      ...incomeData.loanSimulationData,
      rateType: incomeData.loanSimulationData.Rate.RateType.cod,
      cae: incomeData.loanSimulationData.annualCAE,
      loanType,
      vfg,
    },
    vehicleData: {
      brandName: incomeData.loanSimulationCar.carBrandDescription,
      modelName: incomeData.loanSimulationCar.carModelDescription,
      version: incomeData.loanSimulationCar.carVersion,
      year: incomeData.loanSimulationCar.year,
    },
    simulationId: incomeData.loanSimulationData.id,
  };
  return formatedPower;
};

const simulationSave = async (message) => {
  try {
    const incomeData = JSON.parse(message.data.toString());
    const { loanSimulationData } = incomeData;
    console.log(`>>>>>> simulationSave incoming message for (${loanSimulationData.id}) simulation <<<<<<`);
    let simulationObject = await LoansApplication.findOne({
      simulationId: +loanSimulationData.id,
    });
    if (simulationObject) {
      if (simulationObject.externalIds.includes(loanSimulationData.externalId)) return;
      simulationObject.externalIds.push(loanSimulationData.externalId);
      simulationObject = formatLoanApplication(incomeData, simulationObject.externalIds);
    } else {
      const loanApplication = formatLoanApplication(incomeData, [incomeData.loanSimulationData.externalId]);
      simulationObject = new LoansApplication(loanApplication);
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
