const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    loanApplicationId: { type: Number, required: true },
    documentClassification: { type: Object, required: false },
    documentType: { type: Object, required: false },
    required: { type: Boolean, default: false },
    financingEntityId: { type: String, required: false },
    files: [
      {
        fileName: { type: String, required: false },
        uuid: { type: String, required: false },
      },
    ],
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
