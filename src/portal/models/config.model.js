const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema(
  {
    allowedMimeTypes: [{ type: mongoose.Schema.Types.String }],
    maxFileSizeInKB: { type: mongoose.Schema.Types.Number },
    terms: [
      {
        key: { type: mongoose.Schema.Types.String },
        description: { type: mongoose.Schema.Types.String },
        configType: { type: mongoose.Schema.Types.String },
      },
    ],
  },
  {
    collection: 'config',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('Config', ConfigSchema);
