const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema(
  {
    allowedMimeTypes: [{ type: mongoose.Schema.Types.String }],
    maxFileSizeInKB: { type: mongoose.Schema.Types.Number },
  },
  {
    collection: 'config',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('Config', ConfigSchema);
