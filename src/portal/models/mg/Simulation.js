const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  simulationId: { type: String, required: true },
  transactionId: { type: String, required: true },
  sellerIdentificationValue: { type: String, required: true },
  amicarExecutiveIdentificationValue: { type: String, required: true },
  customer: { type: Object, required: true },
  vehicle: { type: Object, required: true },
  loan: { type: Object, required: true },
  surchargesAndInsurances: { type: Object, required: true },
  selectedScenario: { type: Object, required: true },
});

module.exports = mongoose.model('Simulation', schema);
