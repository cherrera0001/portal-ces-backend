import mongoose from 'mongoose';

const LoansSchema = new mongoose.Schema(
  {
    loanId: { type: mongoose.Schema.Types.String },
    financingEntityId: { type: mongoose.Schema.Types.Number },
    checkList: [
      {
        id: mongoose.Schema.Types.Number,
        name: mongoose.Schema.Types.String,
        step: mongoose.Schema.Types.Number,
        wasSent: mongoose.Schema.Types.Boolean,
        feError: mongoose.Schema.Types.String,
        documents: [
          {
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
