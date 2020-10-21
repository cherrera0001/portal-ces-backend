const mongoose = require('mongoose');

const AuctionParticipantsSchema = new mongoose.Schema(
  {
    loanApplicationId: { type: mongoose.Schema.Types.Number, index: true, unique: true },
    auctionParticipants: [],
    auctionStartDate: { type: mongoose.Schema.Types.Date },
    status: { type: mongoose.Schema.Types.Object },
  },
  {
    collection: 'auctionParticipants',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb(`amices_${process.env.NODE_ENV}`);
module.exports = db.model('AuctionParticipants', AuctionParticipantsSchema, 'auctionParticipants');
