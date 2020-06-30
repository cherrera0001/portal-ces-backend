const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  customer: { type: Object, required: true },
  customerRequestData: { type: Object, required: true },
  income: { type: Object, required: true },
  otherIncome: { type: Object, required: true },
  expenses: { type: Object, required: true },
  taxReturn: { type: Object, required: true },
  spouseData: { type: Object, required: true },
  buyForAnother: { type: Object, required: true },
  guarantor: { type: Object, required: true },
  bankInformation: { type: Object, required: true },
  heritage: { type: Object, required: true },
  personalReferences: { type: Object, required: true },
  finalLoanValues: { type: Object, required: true },
  equivalentAnnualCharge: { type: Object, required: true },
  amortizationSchedule: { type: Object, required: true },
  surchargesAndInsurances: { type: Object, required: true },
  loanSimulationCar: { type: Object, required: true },
  customerActivity: { type: Object, required: true },
});

module.exports = mongoose.model('Auction', schema);
