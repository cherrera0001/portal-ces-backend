import mongoose from 'mongoose';

const LoansSchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String },
  },
  {
    collection: 'loans',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('Loans', LoansSchema);
