const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  loanSimulationData: [{ type: Object, required: true }],
  finalLoanValues: [{ type: Object, required: true }],
  equivalentAnnualCharge: [{ type: Object, required: true }],
  customerRequestData: { type: Object, required: true },
  income: { type: Object, required: true },
  otherIncome: { type: Object, required: true },
  expenses: { type: Object, required: true },
  taxReturn: [{ type: Object, required: true }],
  spouseData: { type: Object, required: true },
  guarantor: [{ type: Object, required: true }],
  buyForAnother: { type: Object, required: true },
  amortizationSchedule: [{ type: Object, required: true }],
  surchargesAndInsurances: [{ type: Object, required: true }],
  customerActivity: { type: Object, required: true },
  indexaProductsConversion: [{ type: Object, required: true }],
  bankInformation: [{ type: Object, required: true }],
  personalReferences: [{ type: Object, required: true }],
  loanSimulationCar: [{ type: Object, required: true }],
  tradeInCar: [{ type: Object, required: true }],
  heritage: [{ type: Object, required: true }],
  customer: { type: Object, required: true },
  stage: { type: Number, required: false },
  simulationId: { type: Number, required: false },
  sellerIdentificationValue: { type: String, required: false },
  amicarExecutiveIdentificationValue: { type: String, required: false },
  loansApplication: { type: mongoose.Schema.Types.ObjectId, ref: 'LoansApplication' },
});

module.exports = mongoose.model('LoansApplicationFE', schema, 'loansApplicationFE');
