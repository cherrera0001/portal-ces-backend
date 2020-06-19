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
    collection: 'CoreParams',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('CoreParams', CoreParamsSchema);
