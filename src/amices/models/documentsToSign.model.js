const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    loanApplicationId: { type: Number, required: true },
    document: {
      type: Object,
      default: null,
    },
    files: [
      {
        uuid: { type: String, required: false },
        fileName: { type: String, required: false },
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
