const rollbar = require('rollbar');
const LoansApplication = require('portal/models/loansApplication.model');

const getExternalCode = (coreParam) => {
  return coreParam ? coreParam.externalCode : '';
};

const formatLoanApplication = (incomeData, externalIds) => {
  const {
    customerRequestData,
    customerActivity,
    spouseData,
    buyForAnother,
    guarantor,
    bankInformation,
    heritage,
    personalReferences,
    loanSimulationData,
    loanSimulationCar,
    amortizationSchedule,
  } = incomeData;
  const loanType = loanSimulationData.LoanType.cod;
  const vfg = loanType === 'SMART' ? amortizationSchedule.find((schedule) => schedule.quotaType === 'SMART') : null;

  const formatedPower = {
    ...incomeData,
    customerRequestData: {
      ...customerRequestData,
      maritalStatus: getExternalCode(customerRequestData.maritalStatus),
      maritalRegime: getExternalCode(customerRequestData.maritalRegime),
      academicLevel: getExternalCode(customerRequestData.academicLevel),
      livingHousehold: getExternalCode(customerRequestData.livingHousehold),
    },
    customerActivity: {
      ...customerActivity,
      workType: getExternalCode(customerActivity.workType),
      // activityTypeId: getExternalCode(customerActivity.activityTypeId),
      // businessSectorId: getExternalCode(customerActivity.businessSectorId),
      // workGeographicDataId: getExternalCode(customerActivity.workGeographicDataId),
      employmentContractType: getExternalCode(customerActivity.employmentContractType),
      salaryType: getExternalCode(customerActivity.salaryType),
    },
    spouseData: {
      ...spouseData,
      // spouseGeographicDataId: getExternalCode(spouseData.spouseGeographicDataId),
      workType: getExternalCode(spouseData.workType),
      // activityTypeId: getExternalCode(spouseData.activityTypeId),
    },
    buyForAnother: {
      ...buyForAnother,
      // geographicDataId: getExternalCode(buyForAnother.geographicDataId),
      // nationalityId: getExternalCode(buyForAnother.nationalityId),
      // maritalStatus: getExternalCode(buyForAnother.maritalStatus),
      // maritalRegime: getExternalCode(buyForAnother.maritalRegime),
    },
    guarantor: guarantor.length
      ? guarantor.map((el) => ({
          ...el,
          // geographicDataId: getExternalCode(el.geographicDataId),
          // nationalityId: getExternalCode(el.nationalityId),
          maritalStatus: getExternalCode(el.maritalStatus),
          maritalRegime: getExternalCode(el.maritalRegime),
          workType: getExternalCode(el.workType),
          // activityTypeId: getExternalCode(el.activityTypeId),
        }))
      : [],
    bankInformation: bankInformation.length
      ? bankInformation.map((el) => ({
          ...el,
          // codeId: getExternalCode(bankInformation.codeId),
        }))
      : [],
    heritage: heritage.length
      ? heritage.map((el) => ({
          ...el,
          // financing: getExternalCode(heritage.financing),
          type: getExternalCode(heritage.type),
        }))
      : [],
    personalReferences: personalReferences.length
      ? personalReferences.map((el) => ({
          ...el,
          // type: getExternalCode(personalReferences.type),
        }))
      : [],
    loan: {
      ...loanSimulationData,
      rateType: loanSimulationData.Rate.RateType.cod,
      cae: loanSimulationData.annualCAE,
      loanType,
      vfg,
    },
    vehicleData: {
      brandName: loanSimulationCar.carBrandDescription,
      modelName: loanSimulationCar.carModelDescription,
      version: loanSimulationCar.carVersion,
      year: loanSimulationCar.year,
    },
    simulationId: loanSimulationData.id,
    externalIds,
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
      simulationObject.update(formatLoanApplication(incomeData, simulationObject.externalIds));
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
