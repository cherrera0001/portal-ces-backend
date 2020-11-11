const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    rut: { type: String, required: true },
    email: { type: String, required: false },
    companyIdentificationValue: { type: String, required: false },
    sellerIdentificationValue: { type: String, required: false },
    amicarExecutiveIdentificationValue: { type: String, required: false },
    memberOf: { type: String, required: false },
    enabled: { type: Boolean, default: false },
    forApp: { type: String, required: false },
    saleChannel: { type: String, required: false },
    saleChannelType: { type: String, required: false },
    salesRoomId: { type: Number, required: false },
    profile: { type: String, required: false },
  },
  {
    collection: 'users',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('Users', schema);
