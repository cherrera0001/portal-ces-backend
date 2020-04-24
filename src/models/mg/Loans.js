import mongoose from 'mongoose';

const LoansSchema = new mongoose.Schema(
  {
    loanId: { type: mongoose.Schema.Types.String },
    financingEntityId: { type: mongoose.Schema.Types.String },
    checkList: [
      {
        id: mongoose.Schema.Types.String,
        name: mongoose.Schema.Types.String,
        step: mongoose.Schema.Types.Number,
        documentType: mongoose.Schema.Types.String,
        wasSent: mongoose.Schema.Types.Boolean,
        feError: mongoose.Schema.Types.String,
        documents: [
          {
            id: mongoose.Schema.Types.String,
            uuid: mongoose.Schema.Types.String,
          },
        ],
      },
    ],
  },
  {
    collection: 'loans',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('Loans', LoansSchema);
