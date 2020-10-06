const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    loanStatus: [{ code: String, status: String, color: String }],
    minimumRate: { type: mongoose.Schema.Types.Number },
    coreToken: { type: mongoose.Schema.Types.String },
    allowedMimeTypes: [{ type: mongoose.Schema.Types.String }],
    allowedFileTypes: { type: mongoose.Schema.Types.String },
    maxFileSizeInKB: { type: mongoose.Schema.Types.Number },
    coreUrls: { type: Object },
  },
  {
    collection: 'config',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`eficar_${process.env.NODE_ENV}`);
module.exports = db.model('Configs', schema);
