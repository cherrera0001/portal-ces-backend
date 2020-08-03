const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    externalCode: { type: String },
    parentId: { type: Number },
    type: { type: String },
  },
  {
    collection: 'params',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`eficar_${process.env.NODE_ENV}`);
module.exports = db.model('Params', schema);
