const mongoose = require('mongoose');

const CoreParamsSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.Number },
    name: { type: mongoose.Schema.Types.String },
    externalCode: { type: mongoose.Schema.Types.String },
    parentId: { type: mongoose.Schema.Types.Number },
    type: { type: mongoose.Schema.Types.String },
  },
  {
    collection: 'coreParams',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('CoreParams', CoreParamsSchema);
