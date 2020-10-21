const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    description: { type: String, required: true },
    documentTypeId: { type: String, required: false },
    value: { type: String, required: false },
  },
  {
    collection: 'assistances',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('Assistances', schema);
