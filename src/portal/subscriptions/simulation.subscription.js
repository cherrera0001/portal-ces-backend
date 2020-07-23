const rollbar = require('rollbar');
const LoansApplication = require('portal/models/loansApplication.model');

const formatLoanApplication = (incomeData) => {
  const loanType = incomeData.loanSimulationData.LoanType.cod;
  const vfg =
    loanType === 'SMART' ? incomeData.amortizationSchedule.find((schedule) => schedule.quotaType === 'SMART') : null;
  const formatedPower = {
    ...incomeData,
    customer: {
      ...incomeData.customer,
      nationality: incomeData.customer.nationality.externalCode,
      geographicDataId: incomeData.customer.geographicDataId.externalCode,
      gender: incomeData.customer.gender.externalCode,
    },
    customerRequestData: {
      ...incomeData.customerRequestData,
      maritalStatus: incomeData.customerRequestData.maritalStatus.externalCode,
      maritalRegime: incomeData.customerRequestData.maritalRegime.externalCode,
      academicLevel: incomeData.customerRequestData.academicLevel.externalCode,
      livingHousehold: incomeData.customerRequestData.livingHousehold.externalCode,
    },
    customerActivity: {
      ...incomeData.customerActivity,
      workType: incomeData.customerActivity.workType.externalCode,
      activityTypeId: incomeData.customerActivity.activityTypeId.externalCode,
      businessSectorId: incomeData.customerActivity.businessSectorId.externalCode,
      workGeographicDataId: incomeData.customerActivity.workGeographicDataId.externalCode,
      employmentContractType: incomeData.customerActivity.employmentContractType.externalCode,
      salaryType: incomeData.customerActivity.salaryType.externalCode,
    },
    spouseData: {
      ...incomeData.spouseData,
      spouseGeographicDataId: incomeData.spouseData.spouseGeographicDataId.externalCode,
      workType: incomeData.spouseData.workType.externalCode,
      activityTypeId: incomeData.spouseData.activityTypeId.externalCode,
    },
    buyForAnother: {
      ...incomeData.buyForAnother,
      geographicDataId: incomeData.buyForAnother.geographicDataId.externalCode,
      nationalityId: incomeData.buyForAnother.nationalityId.externalCode,
      maritalStatus: incomeData.buyForAnother.maritalStatus.externalCode,
      maritalRegime: incomeData.buyForAnother.maritalRegime.externalCode,
    },
    // guarantor: {
    //   ...incomeData.guarantor,
    //   geographicDataId: incomeData.guarantor.geographicDataId.externalCode,
    //   nationalityId: incomeData.guarantor.nationalityId.externalCode,
    //   maritalStatus: incomeData.guarantor.maritalStatus.externalCode,
    //   maritalRegime: incomeData.guarantor.maritalRegime.externalCode,
    //   workType: incomeData.guarantor.workType.externalCode,
    //   activityTypeId: incomeData.guarantor.activityTypeId.externalCode,
    // },
    // bankInformation: {
    //   ...incomeData.bankInformation,
    //   codeId: incomeData.bankInformation.codeId.externalCode,
    // },
    heritage: {
      ...incomeData.heritage,
      // financing: incomeData.heritage ? incomeData.heritage.financing.externalCode,
      type: incomeData.heritage.type.externalCode,
    },
    // personalReferences: {
    //   ...incomeData.personalReferences,
    //   type: incomeData.personalReferences.type.externalCode,
    // },
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
