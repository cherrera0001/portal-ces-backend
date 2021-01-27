const aqp = require('api-query-params');
const HTTP = require('requests');
const LoansApplication = require('amices/models/loanApplications.model');
const { PATH_ENDPOINT_LOAN_APPLICATION, PATH_CORE_LOAN_SUBMISSIONS } = require('amices/core.services');
const errors = require('amices/errors');
const findLoanStatus = require('amices/helpers/findLoanStatus');
const mapCompany = require('amices/helpers/mapCompanyApplication');
const naturalFormat = require('amices/helpers/naturalFormatLoanApplication');
const companyFormat = require('amices/helpers/companyFormatLoanAppliation');

const { CORE_URL } = process.env;

const formatLoanApplication = (incomeData, externalIds) => {
  return incomeData.customer.identificationTypeId === 1
    ? naturalFormat(incomeData, externalIds)
    : companyFormat(incomeData, externalIds);
};

const create = async (req, res) => {
  const loansApplication = new LoansApplication({ ...req.body });
  loansApplication.save();
  res.status(201).end();
};

const all = async (req, res) => {
  const recordsPerPage = 20;
  const hasPagination = !!req.params.page;
  const currentPage = req.params.page - 1;
  const { filter, skip, limit, sort, projection, population } = aqp({
    ...req.query,
    ...(hasPagination && { skip: currentPage * recordsPerPage }),
  });
  const loansApplications = await LoansApplication.find(filter)
    .skip(skip)
    .limit(hasPagination ? recordsPerPage : limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await LoansApplication.find(filter).select(projection);

  res.json({
    total: hasPagination ? Math.ceil(total.length / recordsPerPage) : total.length,
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
    res.status(200).end();
  } catch (e) {
    throw Error(e.message);
  }
};

const saveExternal = async (req, res) => {
  try {
    console.log(req.body.message.data, '-----');
    if (!req.body.message.data) return errors.badRequest(res);
    const incomingData = req.body.message.data;
    const { loanSimulationData } = incomingData;
    let simulationObject = await LoansApplication.findOne({
      simulationId: +loanSimulationData.id,
    });
    if (simulationObject) {
      if (simulationObject.externalIds.includes(loanSimulationData.externalId)) return res.status(200).end();
      simulationObject.externalIds.push(loanSimulationData.externalId);
      await LoansApplication.updateOne(
        { _id: simulationObject._id },
        formatLoanApplication(incomingData, simulationObject.externalIds),
      );
      await simulationObject.updateOne({
        ...formatLoanApplication(incomingData, simulationObject.externalIds),
        status: await findLoanStatus(loanSimulationData.status),
      });
    } else {
      const loanApplication = formatLoanApplication(incomingData, [incomingData.loanSimulationData.externalId]);
      simulationObject = new LoansApplication(loanApplication);
      await simulationObject.save();
      simulationObject.status = await findLoanStatus();
      await simulationObject.save();
    }
    res.status(200).end();
  } catch (e) {
    console.log(e.message);
    throw Error(e);
  }
};

const finish = async (req, res) => {
  if (!req.body.message.data) return errors.badRequest(res);
  const { loanApplicationId, status } = req.body.message.data;

  const loanApplication = await LoansApplication.findOne({ loanApplicationId });
  if (!loanApplication) return errors.badRequest(res, `Loan application ${loanApplicationId} not found`);

  loanApplication.status = await findLoanStatus(status);
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

//
//
//
// {
//   loanSimulationData: {
//     id: 10000234,
//       customerDataId: 3,
//       salesRoomId: 1,
//       ratesId: 27524,
//       loanTypeId: 1,
//       salesRepresentativeId: 2,
//       amicarExecutiveId: 1,
//       status: 'DRAFT_SIMULATION',
//       dateOfLoanStart: '2020-08-03',
//       dateOfFirstDue: '2020-09-03',
//       daysDelayedFirstDue: 31,
//       term: 36,
//       totalToFinance: 7427653,
//       downPayment: 1000000,
//       balance: 6500000,
//       monthlyPayment: 274525,
//       finalCapital: 7431689,
//       annualCAE: 29.6,
//       externalId: 'A-10382',
//       salesForceSourceId: null,
//       totalSurchargesToMAF: 430000,
//       campaign: null,
//       currencyType: 'CLP',
//       accessories: 500000,
//       tradeInCarValue: 0,
//       dealerRate: 1.33,
//       UFValue: 29112.48,
//       totalSurchargesToQuote: 0,
//       factorTotal: 0.933,
//       promissoryFactor: 0.008,
//       promissoryValue: 59421,
//       totalToFinanceUF: 255.14,
//       delayedInterest: 4036,
//       dealerCommission: 381026,
//       amicarCommission: 833118,
//       customerRate: 1.63,
//       totalLoanCost: 9882900,
//       monthlyCAE: 2.47,
//       auctionTimeEnded: false,
//       auctionTime: null,
//       createdAt: '2021-01-27T18:25:28.364Z',
//       updatedAt: '2021-01-27T18:25:28.364Z',
//       deletedAt: null,
//       LoanType: {
//       id: 1,
//         description: 'CRÉDITO CONVENCIONAL',
//         cod: 'CONVENTIONAL',
//         createdAt: '2020-11-26T20:08:21.027Z',
//         updatedAt: '2020-11-26T20:08:21.027Z'
//     },
//     Rate: {
//       id: 27524,
//         financingEntityId: 1,
//         rateTypeId: 13,
//         vehicleTypeId: 1,
//         loanTypeId: 1,
//         salesChannelId: 11,
//         customerRate: 1.63,
//         baseRate: 1,
//         dealerRate: 1.33,
//         termsFrom: 30,
//         termsTo: 39,
//         amountFinancedFrom: 200,
//         amountFinancedTo: 3700,
//         fee: 0,
//         highlight: 0,
//         immediateOption: false,
//         createdAt: '2020-12-14T12:21:15.000Z',
//         updatedAt: '2020-12-14T12:21:15.000Z',
//         deletedAt: null,
//         RateType: [Object]
//     },
//     SalesRoom: {
//       id: 1,
//         salesChannelId: 1,
//         name: '10 CARRERA',
//         address: 'JOSE MIGUEL CARRERA 56, SANTIAGO, METROPOLITANA DE SANTIAGO',
//         latLong: [Array],
//         type: 'OWN',
//         legacyId: null,
//         supervisorId: null,
//         supervisorName: null,
//         zone: null,
//         createdAt: '2020-11-26T20:08:21.125Z',
//         updatedAt: '2020-11-26T20:08:21.125Z',
//         deletedAt: null,
//         SalesChannel: [Object]
//     },
//     salesRepresentative: {
//       id: 2,
//         fullName: 'USER SELLER TEST',
//         rut: '112223339',
//         gender: 'FEMALE',
//         phone: '940462418',
//         position: 'SELLER',
//         status: true,
//         birthdate: '1983-12-30T00:00:00.000Z',
//         createdAt: '2020-11-26T20:08:21.261Z',
//         updatedAt: '2020-11-26T20:08:21.261Z',
//         deletedAt: null
//     },
//     amicarExecutive: {
//       id: 1,
//         fullName: 'USER AMICAR EXECUTIVE',
//         rut: '156681911',
//         gender: 'FEMALE',
//         phone: '940462417',
//         position: 'AMICAR_EXECUTIVE',
//         status: true,
//         birthdate: '1983-12-29T00:00:00.000Z',
//         createdAt: '2020-11-26T20:08:21.261Z',
//         updatedAt: '2020-11-26T20:08:21.261Z',
//         deletedAt: null
//     }
//   },
//   equivalentAnnualCharge: { annualCAE: 29.6, monthlyCAE: 2.47, totalLoanCost: 9882900 },
//   finalLoanValues: {
//     loanTypeId: 1,
//       term: 36,
//       balance: 6500000,
//       UFValue: 29112.48,
//       totalSurchargesToMAF: 430000,
//       totalSurchargesToQuote: 0,
//       factorTotal: 0.933,
//       promissoryFactor: 0.008,
//       promissoryValue: 59421,
//       totalToFinance: 7427653,
//       totalToFinanceUF: 255.14,
//       finalCapital: 7431689,
//       daysDelayedFirstDue: 31,
//       delayedInterest: 4036,
//       monthlyPayment: 274525,
//       customerRate: 1.63,
//       dealerCommission: 381026,
//       amicarCommission: 833118
//   },
//   customerRequestData: {},
//   amortizationSchedule: [
//     {
//       id: 9717,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 1,
//       expirationDate: '2020-09-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 7431689,
//       principal: 153388,
//       interest: 121137,
//       endingBalance: 7278301,
//       cumulativeInterest: 121137,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9718,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 2,
//       expirationDate: '2020-10-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 7278301,
//       principal: 155889,
//       interest: 118636,
//       endingBalance: 7122412,
//       cumulativeInterest: 239773,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9719,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 3,
//       expirationDate: '2020-11-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 7122412,
//       principal: 158430,
//       interest: 116095,
//       endingBalance: 6963982,
//       cumulativeInterest: 355868,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9720,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 4,
//       expirationDate: '2020-12-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 6963982,
//       principal: 161012,
//       interest: 113513,
//       endingBalance: 6802970,
//       cumulativeInterest: 469381,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9721,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 5,
//       expirationDate: '2021-01-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 6802970,
//       principal: 163636,
//       interest: 110888,
//       endingBalance: 6639334,
//       cumulativeInterest: 580269,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9722,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 6,
//       expirationDate: '2021-02-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 6639334,
//       principal: 166304,
//       interest: 108221,
//       endingBalance: 6473030,
//       cumulativeInterest: 688491,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9723,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 7,
//       expirationDate: '2021-03-03',
//       daysBetweenExpirationsDates: 28,
//       payment: 274525,
//       beginningBalance: 6473030,
//       principal: 169014,
//       interest: 105510,
//       endingBalance: 6304016,
//       cumulativeInterest: 794001,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9724,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 8,
//       expirationDate: '2021-04-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 6304016,
//       principal: 171769,
//       interest: 102755,
//       endingBalance: 6132246,
//       cumulativeInterest: 896756,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9725,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 9,
//       expirationDate: '2021-05-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 6132246,
//       principal: 174569,
//       interest: 99956,
//       endingBalance: 5957677,
//       cumulativeInterest: 996712,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9726,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 10,
//       expirationDate: '2021-06-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 5957677,
//       principal: 177415,
//       interest: 97110,
//       endingBalance: 5780262,
//       cumulativeInterest: 1093822,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9727,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 11,
//       expirationDate: '2021-07-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 5780262,
//       principal: 180307,
//       interest: 94218,
//       endingBalance: 5599956,
//       cumulativeInterest: 1188041,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9728,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 12,
//       expirationDate: '2021-08-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 5599956,
//       principal: 183246,
//       interest: 91279,
//       endingBalance: 5416710,
//       cumulativeInterest: 1279320,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9729,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 13,
//       expirationDate: '2021-09-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 5416710,
//       principal: 186233,
//       interest: 88292,
//       endingBalance: 5230478,
//       cumulativeInterest: 1367612,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9730,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 14,
//       expirationDate: '2021-10-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 5230478,
//       principal: 189268,
//       interest: 85257,
//       endingBalance: 5041209,
//       cumulativeInterest: 1452869,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9731,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 15,
//       expirationDate: '2021-11-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 5041209,
//       principal: 192353,
//       interest: 82172,
//       endingBalance: 4848856,
//       cumulativeInterest: 1535041,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9732,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 16,
//       expirationDate: '2021-12-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 4848856,
//       principal: 195489,
//       interest: 79036,
//       endingBalance: 4653368,
//       cumulativeInterest: 1614077,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9733,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 17,
//       expirationDate: '2022-01-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 4653368,
//       principal: 198675,
//       interest: 75850,
//       endingBalance: 4454693,
//       cumulativeInterest: 1689927,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9734,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 18,
//       expirationDate: '2022-02-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 4454693,
//       principal: 201913,
//       interest: 72611,
//       endingBalance: 4252779,
//       cumulativeInterest: 1762538,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9735,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 19,
//       expirationDate: '2022-03-03',
//       daysBetweenExpirationsDates: 28,
//       payment: 274525,
//       beginningBalance: 4252779,
//       principal: 205205,
//       interest: 69320,
//       endingBalance: 4047575,
//       cumulativeInterest: 1831859,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9736,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 20,
//       expirationDate: '2022-04-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 4047575,
//       principal: 208549,
//       interest: 65975,
//       endingBalance: 3839025,
//       cumulativeInterest: 1897834,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9737,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 21,
//       expirationDate: '2022-05-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 3839025,
//       principal: 211949,
//       interest: 62576,
//       endingBalance: 3627077,
//       cumulativeInterest: 1960410,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9738,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 22,
//       expirationDate: '2022-06-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 3627077,
//       principal: 215404,
//       interest: 59121,
//       endingBalance: 3411673,
//       cumulativeInterest: 2019532,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9739,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 23,
//       expirationDate: '2022-07-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 3411673,
//       principal: 218915,
//       interest: 55610,
//       endingBalance: 3192758,
//       cumulativeInterest: 2075142,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9740,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 24,
//       expirationDate: '2022-08-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 3192758,
//       principal: 222483,
//       interest: 52042,
//       endingBalance: 2970275,
//       cumulativeInterest: 2127184,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9741,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 25,
//       expirationDate: '2022-09-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 2970275,
//       principal: 226109,
//       interest: 48415,
//       endingBalance: 2744166,
//       cumulativeInterest: 2175599,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9742,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 26,
//       expirationDate: '2022-10-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 2744166,
//       principal: 229795,
//       interest: 44730,
//       endingBalance: 2514371,
//       cumulativeInterest: 2220329,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9743,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 27,
//       expirationDate: '2022-11-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 2514371,
//       principal: 233541,
//       interest: 40984,
//       endingBalance: 2280830,
//       cumulativeInterest: 2261314,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9744,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 28,
//       expirationDate: '2022-12-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 2280830,
//       principal: 237347,
//       interest: 37178,
//       endingBalance: 2043483,
//       cumulativeInterest: 2298491,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9745,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 29,
//       expirationDate: '2023-01-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 2043483,
//       principal: 241216,
//       interest: 33309,
//       endingBalance: 1802267,
//       cumulativeInterest: 2331800,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9746,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 30,
//       expirationDate: '2023-02-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 1802267,
//       principal: 245148,
//       interest: 29377,
//       endingBalance: 1557119,
//       cumulativeInterest: 2361177,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9747,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 31,
//       expirationDate: '2023-03-03',
//       daysBetweenExpirationsDates: 28,
//       payment: 274525,
//       beginningBalance: 1557119,
//       principal: 249144,
//       interest: 25381,
//       endingBalance: 1307975,
//       cumulativeInterest: 2386558,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9748,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 32,
//       expirationDate: '2023-04-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 1307975,
//       principal: 253205,
//       interest: 21320,
//       endingBalance: 1054770,
//       cumulativeInterest: 2407878,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9749,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 33,
//       expirationDate: '2023-05-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 1054770,
//       principal: 257332,
//       interest: 17193,
//       endingBalance: 797438,
//       cumulativeInterest: 2425071,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9750,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 34,
//       expirationDate: '2023-06-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 797438,
//       principal: 261527,
//       interest: 12998,
//       endingBalance: 535911,
//       cumulativeInterest: 2438069,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9751,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 35,
//       expirationDate: '2023-07-03',
//       daysBetweenExpirationsDates: 30,
//       payment: 274525,
//       beginningBalance: 535911,
//       principal: 265790,
//       interest: 8735,
//       endingBalance: 270122,
//       cumulativeInterest: 2446804,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     },
//     {
//       id: 9752,
//       loanSimulationDataId: 10000234,
//       paymentNumber: 36,
//       expirationDate: '2023-08-03',
//       daysBetweenExpirationsDates: 31,
//       payment: 274525,
//       beginningBalance: 270122,
//       principal: 270122,
//       interest: 4403,
//       endingBalance: 0,
//       cumulativeInterest: 2451207,
//       quotaType: 'REGULAR',
//       totalSurchargesToQuote: 0,
//       finalPayment: 274525
//     }
//   ],
//     expenses: {},
//   buyForAnother: {},
//   income: {},
//   indexaProductsConversion: {
//     id: 364,
//       rateTypeId: 13,
//       vehicleTypeId: 1,
//       loanTypeId: 1,
//       salesChannelId: 11,
//       immediateOption: false,
//       indexaId: 919,
//       indexaName: '207 PARTICULAR NUEVO DESFASE 120 DIAS',
//       createdAt: '2020-11-26T17:08:28.000Z',
//       updatedAt: '2020-11-26T17:08:28.000Z',
//       deletedAt: null
//   },
//   guarantor: [],
//     customerActivity: {},
//   otherIncome: {},
//   spouseData: {},
//   taxReturn: [],
//     surchargesAndInsurances: [
//   {
//     id: 1387,
//     description: 'IMPUESTO VERDE',
//     value: 0,
//     valueToMAF: true,
//     calculateFormulae: 'NO_CALCULATION',
//     calculateCommissionFinancialEntity: false,
//     isEditable: true,
//     calculateCommissionDealer: false,
//     calculateCommissionFnI: false,
//     currencyType: 'CLP',
//     isRequired: false,
//     selected: false,
//     type: 'dealerSurcharges',
//     idRef: 1,
//     insuranceType: null,
//     factorCalculated: 0,
//     legacyId: 0
//   },
//   {
//     id: 1388,
//     description: 'PATENTE',
//     value: 0,
//     valueToMAF: true,
//     calculateFormulae: 'NO_CALCULATION',
//     calculateCommissionFinancialEntity: false,
//     isEditable: true,
//     calculateCommissionDealer: false,
//     calculateCommissionFnI: false,
//     currencyType: 'CLP',
//     isRequired: false,
//     selected: false,
//     type: 'dealerSurcharges',
//     idRef: 3,
//     insuranceType: null,
//     factorCalculated: 0,
//     legacyId: 0
//   },
//   {
//     id: 1389,
//     description: 'INSCRIPCION',
//     value: 0,
//     valueToMAF: true,
//     calculateFormulae: 'NO_CALCULATION',
//     calculateCommissionFinancialEntity: false,
//     isEditable: false,
//     calculateCommissionDealer: false,
//     calculateCommissionFnI: false,
//     currencyType: 'CLP',
//     isRequired: true,
//     selected: true,
//     type: 'dealerSurcharges',
//     idRef: 5,
//     insuranceType: null,
//     factorCalculated: 0,
//     legacyId: 0
//   },
//   {
//     id: 1390,
//     description: 'MANTENCION PREPAGADA',
//     value: 0,
//     valueToMAF: true,
//     calculateFormulae: 'NO_CALCULATION',
//     calculateCommissionFinancialEntity: false,
//     isEditable: true,
//     calculateCommissionDealer: false,
//     calculateCommissionFnI: false,
//     currencyType: 'CLP',
//     isRequired: false,
//     selected: false,
//     type: 'dealerSurcharges',
//     idRef: 9,
//     insuranceType: null,
//     factorCalculated: 0,
//     legacyId: 0
//   },
//   {
//     id: 1391,
//     description: 'G. OPERACIONALES',
//     value: 430000,
//     valueToMAF: true,
//     calculateFormulae: 'NO_CALCULATION',
//     calculateCommissionFinancialEntity: false,
//     isEditable: false,
//     calculateCommissionDealer: false,
//     calculateCommissionFnI: false,
//     currencyType: 'CLP',
//     isRequired: true,
//     selected: true,
//     type: 'financingEntitySurcharges',
//     idRef: 434,
//     insuranceType: null,
//     factorCalculated: 430000,
//     legacyId: 0
//   },
//   {
//     id: 1392,
//     description: 'DESGRAVAMEN',
//     value: 59,
//     valueToMAF: true,
//     calculateFormulae: 'MAF_PERCENTAGE',
//     calculateCommissionFinancialEntity: false,
//     isEditable: null,
//     calculateCommissionDealer: false,
//     calculateCommissionFnI: false,
//     currencyType: 'CLP',
//     isRequired: true,
//     selected: true,
//     type: 'financingEntityInsurance',
//     idRef: 336,
//     insuranceType: 'RELIEF',
//     factorCalculated: 438232,
//     legacyId: 0
//   }
// ],
//   manualAssignmentLogs: [],
//   majorityPartners: [],
//   tradeInCar: {},
//   legalRepresentative: [],
//     customerSuppliers: [],
//   bankInformation: [],
//   personalReferences: [],
//   heritage: [],
//   loanSimulationCar: {
//   id: 235,
//     loanSimulationDataId: 10000234,
//     vehicleTypeId: 1,
//     carBrandId: 837,
//     carBrandDescription: 'MAZDA',
//     carModelId: 6129,
//     carModelDescription: '3',
//     carVersion: 'R',
//     year: 2020,
//     price: 7000000,
//     additionalDescription: null,
//     licensePlate: null,
//     createdAt: '2021-01-27T18:25:28.389Z',
//     updatedAt: '2021-01-27T18:25:28.389Z',
//     deletedAt: null,
//     VehicleType: {
//     id: 131,
//       description: 'PARTICULAR NUEVO',
//       cod: 'BRAND_NEW_PERSONAL',
//       name: 'LIVIANO - NUEVO',
//       parentId: 0,
//       internalCode: '1',
//       externalCode: 'NU',
//       type: 'VEHICLE_TYPE',
//       createdAt: '2020-11-26T20:08:21.904Z',
//       updatedAt: '2020-11-26T20:08:21.904Z',
//       deletedAt: null
//   },
//   Model: {
//     id: 6129,
//       name: '3',
//       parentId: 837,
//       internalCode: null,
//       externalCode: '66',
//       type: 'VEHICLE_MODEL',
//       createdAt: '2020-11-26T20:09:57.424Z',
//       updatedAt: '2020-11-26T20:09:57.424Z',
//       deletedAt: null
//   },
//   Brand: {
//     id: 837,
//       name: 'MAZDA',
//       parentId: 136,
//       internalCode: null,
//       externalCode: '212',
//       type: 'VEHICLE_BRAND',
//       createdAt: '2020-11-26T20:09:47.765Z',
//       updatedAt: '2020-11-26T20:09:47.765Z',
//       deletedAt: null
//   }
// },
//   customer: {
//     id: 3,
//       identificationValue: '551231232',
//       identificationTypeId: 2,
//       documentSerialNumber: 'A8371280274',
//       name: 'Cesar',
//       lastName: 'Mayo',
//       motherLastName: '',
//       email: 'email@domain.com',
//       phone: '+56955554433',
//       address: 'Jose pedro alessandri',
//       latLong: null,
//       dob: '2002-10-02',
//       nationality: 'CHILEAN',
//       geographicDataId: 209,
//       gender: 'MALE',
//       companyName: 'Continuum',
//       businessSectorId: 122,
//       businessSectorDescription: 'Continuum',
//       numberOfWorkers: 1,
//       workPhone: '954824200',
//       contactName: 'Cesar',
//       contactWorkPosition: 'jefe',
//       contactPhone: 'asd',
//       contactWorkPhone: '8312913054',
//       contactEmail: 'accliutnew@hotmail.com',
//       createdAt: '2020-12-10T13:28:08.906Z',
//       updatedAt: '2021-01-27T18:12:09.215Z',
//       deletedAt: null,
//       geographicData: { COMMUNE: [Object], REGION: [Object], COUNTRY: [Object] },
//     nationalityData: {
//       id: 43,
//         name: 'CHILENO',
//         parentId: 0,
//         internalCode: 'CHILEAN',
//         externalCode: 'CHILE',
//         type: 'NATIONALITY',
//         createdAt: '2020-11-26T20:08:21.889Z',
//         updatedAt: '2020-11-26T20:08:21.889Z',
//         deletedAt: null
//     },
//     genderData: {
//       id: 45,
//         name: 'MASCULINO',
//         parentId: 0,
//         internalCode: 'MALE',
//         externalCode: 'M',
//         type: 'GENDER_TYPE',
//         createdAt: '2020-11-26T20:08:21.892Z',
//         updatedAt: '2020-11-26T20:08:21.892Z',
//         deletedAt: null
//     },
//     businessSectorData: {
//       id: 122,
//         name: 'ENERGIA',
//         parentId: 0,
//         internalCode: null,
//         externalCode: '9',
//         type: 'BUSINESS_SECTOR',
//         createdAt: '2020-11-26T20:08:21.901Z',
//         updatedAt: '2020-11-26T20:08:21.901Z',
//         deletedAt: null
//     }
//   },
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZTEiLCJydXQiOiI5NjY2NzU2MDgiLCJ1c2VybmFtZSI6IkV2YWx1YWRvciBXZWIgQW1pY2FyIiwiY29tcGFueUlkZW50aWZpY2F0aW9uVmFsdWUiOiI5NjY2NzU2MDgiLCJpYXQiOjE1OTkxNzQ3Mzd9.Lt9yq43sGEukxYFMbDF13POb_h-l4rTkF5OyLwjHSkA'
// }
