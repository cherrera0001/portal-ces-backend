import mongoose from 'mongoose';

const FinancialEntitiesConfigSchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String },
    cod: { type: mongoose.Schema.Types.String },
    approvalCode: { type: mongoose.Schema.Types.String },
    percentageRate: [
      {
        months: { type: mongoose.Schema.Types.Number },
        percentage: { type: mongoose.Schema.Types.Number },
      },
    ],
  },
  {
    collection: 'financialEntitiesConfig',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('FinancialEntitiesConfig', FinancialEntitiesConfigSchema);
