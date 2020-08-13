const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  rut: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: true }, // this will be deleted after ldap is integrated
  companyIdentificationValue: { type: String, required: false },
  sellerIdentificationValue: { type: String, required: false },
  amicarExecutiveIdentificationValue: { type: String, required: false },
  memberOf: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('User', schema);