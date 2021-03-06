const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    loanApplicationId: { type: Number, required: true },
    documentClassification: { type: Object, required: false },
    documentType: { type: Object, required: false },
    financingEntityId: { type: String, required: true },
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

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('DocumentsToSign', schema);
