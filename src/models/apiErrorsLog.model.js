const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const schema = new mongoose.Schema(
  {
    method: { type: String, required: false },
    headers: { type: Object, required: false },
    url: { type: String, required: false },
    body: { type: Object, required: false },
    type: { type: String, required: false },
    error: { type: String, required: false },
    errorStatus: { type: String, required: false },
    requestId: { type: String, required: false },
  },
  {
    collection: 'apiErrorsLogs',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('APIErrorsLogs', schema);
