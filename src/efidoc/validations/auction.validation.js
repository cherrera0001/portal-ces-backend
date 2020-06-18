const Joi = require('@hapi/joi');

exports.create = Joi.object().keys({
  customer: Joi.object().required(),
  customerRequestData: Joi.object().required(),
  income: Joi.object().required(),
  otherIncome: Joi.object().required(),
  expenses: Joi.object().required(),
  taxReturn: Joi.object().required(),
  spouseData: Joi.object().required(),
  buyForAnother: Joi.object().required(),
  guarantor: Joi.object().required(),
  bankInformation: Joi.object().required(),
  heritage: Joi.object().required(),
  personalReferences: Joi.object().required(),
  finalLoanValues: Joi.object().required(),
  equivalentAnnualCharge: Joi.object().required(),
  amortizationSchedule: Joi.object().required(),
  surchargesAndInsurances: Joi.object().required(),
  loanSimulationCar: Joi.object().required(),
  customerActivity: Joi.object().required(),
});
