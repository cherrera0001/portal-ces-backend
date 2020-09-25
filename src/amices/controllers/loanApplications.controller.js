const aqp = require('api-query-params');
const HTTP = require('requests');
const LoansApplication = require('amices/models/loanApplications.model');
const { PATH_ENDPOINT_LOAN_APPLICATION, PATH_CORE_LOAN_SUBMISSIONS } = require('amices/core.services');
const errors = require('amices/errors');

const { CORE_URL } = process.env;

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
    customer,
  } = incomeData;
  const loanType = loanSimulationData.LoanType.cod;
  const vfg = loanType === 'SMART' ? amortizationSchedule.find((schedule) => schedule.quotaType === 'SMART') : null;
  const spouseDataFormated =
    Object.keys(customerRequestData).length > 6
      ? {
          ...spouseData,
          spouseGeographicDataId: spouseData.spouseGeographicData.COMMUNE.externalCode,
          workType: spouseData.workType.externalCode,
          activityType: spouseData.activityType.externalCode,
        }
      : {};
  const buyForAnotherFormated =
    Object.keys(buyForAnother).length > 0
      ? {
          ...buyForAnother,
          geographicDataId: buyForAnother.geographicData.COMMUNE.externalCode,
          nationalityId: buyForAnother.nationalityData.externalCode,
          maritalStatus: buyForAnother.maritalStatusData.externalCode,
          maritalRegime: buyForAnother.maritalRegimeData.externalCode,
        }
      : {};
  const loanApplicationFormated = !Object.keys(customerRequestData).length
    ? {
        ...incomeData,
        simulationId: loanSimulationData.id,
        loan: {
          ...loanSimulationData,
          rateType: loanSimulationData.Rate.RateType,
          cae: loanSimulationData.annualCAE,
          loanType,
          vfg,
        },
        vehicleData: {
          brandName: loanSimulationCar.Brand.name,
          modelName: loanSimulationCar.Model.name,
          version: loanSimulationCar.VehicleType.name,
          year: loanSimulationCar.year,
        },
      }
    : {
        ...incomeData,
        customer: {
          ...customer,
          gender: customer.genderData.externalCode,
          nationality: customer.nationalityData.externalCode,
          geographicDataId: customer.geographicData.COMMUNE.externalCode,
        },
        customerRequestData: {
          ...customerRequestData,
          maritalStatus: customerRequestData.maritalStatus.externalCode,
          maritalRegime: customerRequestData.maritalRegime.externalCode,
          academicLevel: customerRequestData.academicLevel.externalCode,
          livingHousehold: customerRequestData.livingHousehold.externalCode,
        },
        customerActivity: {
          ...customerActivity,
          workType: customerActivity.workType.externalCode,
          activityTypeId: customerActivity.activityType.externalCode,
          businessSectorId: customerActivity.businessSector.externalCode,
          workGeographicDataId: customerActivity.workGeographicData.COMMUNE.externalCode,
          employmentContractType: customerActivity.employmentContractType.externalCode,
          salaryType: customerActivity.salaryType.externalCode,
        },
        spouseData: spouseDataFormated,
        buyForAnother: buyForAnotherFormated,
        guarantor: guarantor.length
          ? guarantor.map((el) => ({
              ...el,
              geographicDataId: el.geographicData.COMMUNE.externalCode,
              nationalityId: el.nationalityData.externalCode,
              maritalStatus: el.maritalStatusData.externalCode,
              maritalRegime: el.maritalRegimeData.externalCode,
              workType: el.workTypeData.externalCode,
              activityTypeId: el.activityTypeData.externalCode,
            }))
          : [],
        bankInformation: bankInformation.length
          ? bankInformation.map((el) => ({
              ...el,
              codeId: el.externalCode,
            }))
          : [],
        heritage: heritage.length
          ? heritage.map((el) => ({
              ...el,
              financing: el.financingTypeData.externalCode,
              type: el.typeExternalCode,
            }))
          : [],
        personalReferences: personalReferences.length
          ? personalReferences.map((el) => ({
              ...el,
              type: el.typeData.externalCode,
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
          brandName: loanSimulationCar.Brand.name,
          modelName: loanSimulationCar.Model.name,
          version: loanSimulationCar.VehicleType.name,
          year: loanSimulationCar.year,
        },
        simulationId: loanSimulationData.id,
        externalIds,
      };
  return loanApplicationFormated;
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
  try {
    await LoansApplication.findOneAndUpdate({ simulationId: req.body.simulationId }, req.body, {
      useFindAndModify: false,
    });
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_LOAN_APPLICATION}`, req.body);
    res.status(response.status).end();
  } catch (e) {
    throw Error(e.message);
  }
};

const saveExternal = async (req, res) => {
  try {
    if (!req.body.message.data) return errors.badRequest(res);
    const incomingData = req.body.message.data;
    const { loanSimulationData } = incomingData;
    let simulationObject = await LoansApplication.findOne({
      simulationId: +loanSimulationData.id,
    });
    if (simulationObject) {
      if (simulationObject.externalIds.includes(loanSimulationData.externalId)) return res.status(200).end();
      simulationObject.externalIds.push(loanSimulationData.externalId);
      console.log(incomingData.guarantor);
      await LoansApplication.updateOne(
        { _id: simulationObject._id },
        formatLoanApplication(incomingData, simulationObject.externalIds),
      );
      await simulationObject.update(formatLoanApplication(incomingData, simulationObject.externalIds));
    } else {
      const loanApplication = formatLoanApplication(incomingData, [incomingData.loanSimulationData.externalId]);
      simulationObject = new LoansApplication(loanApplication);
      await simulationObject.save();
    }
    res.status(200).end();
  } catch (e) {
    throw Error(e);
  }
};

const finish = async (req, res) => {
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, status } = req.body.message.data;

  const loanApplication = await LoansApplication.findOne({ loanApplicationId });
  if (!loanApplication) return errors.badRequest(res, `Loan application ${loanApplicationId} not found`);

  loanApplication.status = status;
  await loanApplication.save();
  return res.status(200).json();
};

const submissions = async (req, res) => {
  try {
    const response = await HTTP.post(`${CORE_URL}${PATH_CORE_LOAN_SUBMISSIONS}/${req.params.loanId}`, {
      ...req.body,
    });
    if (response.status === 200) return res.status(200).json();
  } catch (e) {
    throw Error(e);
  }
};

module.exports = { all, create, save, saveExternal, finish, status, submissions };
