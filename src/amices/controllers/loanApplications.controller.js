const aqp = require('api-query-params');
const HTTP = require('requests');
const LoansApplication = require('amices/models/loanApplications.model');
const { PATH_ENDPOINT_LOAN_APPLICATION } = require('amices/core.services');
const errors = require('amices/errors');

const { CORE_URL } = process.env;

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
      rateType: loanSimulationData.Rate.RateType,
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

const create = async (req, res) => {
  const loansApplication = new LoansApplication({ ...req.body });
  loansApplication.save();
  res.status(201).end();
};

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const loansApplications = await LoansApplication.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await LoansApplication.find(filter).select(projection);

  res.json({
    total: total.length,
    result: loansApplications,
  });
};

const status = async (req, res) => {
  const loansApplication = await LoansApplication.findOne({ simulationId: req.params.id });
  res.json(loansApplication);
};

const save = async (req, res) => {
  await LoansApplication.findOneAndUpdate({ simulationId: req.body.simulationId }, req.body, {
    useFindAndModify: false,
  });
  const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_LOAN_APPLICATION}`, req.body);
  res.status(response.status).end();
};

const saveExternal = async (req, res) => {
  if (!req.body.message.data) return errors.badRequest(res);
  const incomingData = req.body.message.data;
  const { loanSimulationData } = incomingData;
  let simulationObject = await LoansApplication.findOne({
    simulationId: +loanSimulationData.id,
  });
  if (simulationObject) {
    // if (simulationObject.externalIds.includes(loanSimulationData.externalId)) return res.status(200).end();
    // simulationObject.externalIds.push(loanSimulationData.externalId);
    simulationObject.update(formatLoanApplication(incomingData, simulationObject.externalIds));
  } else {
    const loanApplication = formatLoanApplication(incomingData, [incomingData.loanSimulationData.externalId]);
    simulationObject = new LoansApplication(loanApplication);
  }
  await simulationObject.save();
  res.status(200).end();
};

const finish = async (req, res) => {
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, status } = req.body.message.data;

  const loanApplication = await LoansApplication.findOne({ loanApplicationId });
  if (!loanApplication) return errors.badRequest(`Loan application ${loanApplicationId} not found`);

  loanApplication.status = status;
  await loanApplication.save();
  return res.status(200).json();
};

module.exports = { all, create, save, saveExternal, finish, status };