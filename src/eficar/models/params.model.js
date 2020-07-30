const mongoose = require('mongoEficar')();

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

module.exports = mongoose.model('Params', schema);
