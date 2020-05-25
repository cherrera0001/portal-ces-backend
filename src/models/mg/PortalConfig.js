import mongoose from 'mongoose';

const PortalConfigSchema = new mongoose.Schema(
  {
    key: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String },
    configType: { type: mongoose.Schema.Types.String },
  },
  {
    collection: 'PortalConfig',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('PortalConfig', PortalConfigSchema);
