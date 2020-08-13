const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema(
  {
    loanStatus: [{ code: String, status: String, color: String }],
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

const db = mongoose.connection.useDb(`eficar_${process.env.NODE_ENV}`);
module.exports = db.model('Config', ConfigSchema);
