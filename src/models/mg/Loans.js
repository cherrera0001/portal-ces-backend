import mongoose from 'mongoose';

const LoansSchema = new mongoose.Schema(
  {
    loanId: { type: mongoose.Schema.Types.String },
    fEntityId: { type: mongoose.Schema.Types.Number },
    checkList: [
      {
        id: mongoose.Schema.Types.Number,
        name: mongoose.Schema.Types.String,
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
