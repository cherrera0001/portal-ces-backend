const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const schema = new mongoose.Schema(
  {
    url: { type: String, required: false },
    method: { type: String, required: false },
    headers: { type: Object, required: false },
    request: { type: Object, required: false },
    response: { type: Object, required: false },
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
