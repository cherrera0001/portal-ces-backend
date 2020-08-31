const Joi = require('@hapi/joi');

exports.create = Joi.object().keys({
  loanSimulationData: Joi.object(),
  tradeInCar: Joi.object(),
  indexaProductsConversion: Joi.object(),
  customer: Joi.object(),
  customerRequestData: Joi.object(),
  income: Joi.object(),
  otherIncome: Joi.object(),
  expenses: Joi.object(),
  taxReturn: Joi.array(),
  spouseData: Joi.object().optional(),
  buyForAnother: Joi.object().optional(),
  guarantor: Joi.array().optional(),
  bankInformation: Joi.array(),
  heritage: Joi.array(),
  personalReferences: Joi.array(),
  finalLoanValues: Joi.object(),
  equivalentAnnualCharge: Joi.object(),
  amortizationSchedule: Joi.array(),
  surchargesAndInsurances: Joi.array(),
  loanSimulationCar: Joi.object(),
  customerActivity: Joi.object(),
  simulationId: Joi.number().optional(),
  status: Joi.string().optional(),
});
