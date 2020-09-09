const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const schema = new mongoose.Schema(
  {
    action: { type: String, required: false },
    requestId: { type: String, required: false },
    url: { type: String, required: false },
    requestBody: { type: Object, required: false },
    responseBody: { type: Object, required: false },
  },
  {
    collection: 'logRequestAPI',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('LogRequestAPI', schema);
