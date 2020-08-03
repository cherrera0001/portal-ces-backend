const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    name: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    type: mongoose.Schema.Types.String,
    claims: [mongoose.Schema.Types.String],
    sellerIdentificationValue: mongoose.Schema.Types.String,
    amicarExecutiveIdentificationValue: mongoose.Schema.Types.String,
  },
  {
    collection: 'users',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb('portal');
module.exports = db.model('Users', UsersSchema);
