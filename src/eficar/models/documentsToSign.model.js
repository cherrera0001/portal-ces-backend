const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    loanApplicationId: { type: Number, required: true },
    document: {
      type: {
        id: { type: Number, required: false },
        name: { type: String, required: false },
        externalCode: { type: String, required: false },
        parentId: { type: Number, required: false },
        type: { type: String, required: false },
      },
    },
    files: {
      type: Array,
      default: [],
    },
    status: { type: Number, required: false },
  },
  {
    collection: 'documentsToSign',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`eficar_${process.env.NODE_ENV}`);
module.exports = db.model('DocumentsToSign', schema);
