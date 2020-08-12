const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  rut: { type: String, required: true },
  email: { type: String, required: false },
  memberOf: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', schema);
