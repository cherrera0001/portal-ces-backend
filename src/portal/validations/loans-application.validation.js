const Joi = require('@hapi/joi');

exports.create = Joi.object().keys({
  stage: Joi.number().required(),
  simulationId: Joi.number().required(),
  sellerIdentificationValue: Joi.string().optional(),
  amicarExecutiveIdentificationValue: Joi.string().optional(),
  customer: Joi.object().required(),
  customerRequestData: Joi.object().required(),
  customerActivity: Joi.object().required(),
  income: Joi.object().required(),
  otherIncome: Joi.object().optional(),
  expenses: Joi.object().optional(),
  taxReturn: Joi.array().required(),
  spouseData: Joi.object().required(),
  guarantor: Joi.array().required(),
  buyForAnother: Joi.object().optional(),
  bankInformation: Joi.array().required(),
  heritage: Joi.array().required(),
  personalReferences: Joi.array().required(),
  vehicleData: Joi.object().required(),
  loan: Joi.object().required(),
  externalIds: Joi.array().required(),
});
