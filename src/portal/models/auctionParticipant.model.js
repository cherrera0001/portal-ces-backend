const mongoose = require('mongoose');

const AuctionParticipantsSchema = new mongoose.Schema(
  {
    loanApplicationId: { type: mongoose.Schema.Types.Number, index: true, unique: true },
    auctionParticipants: [],
    auctionStartDate: { type: mongoose.Schema.Types.Date },
  },
  {
    collection: 'auctionParticipants',
    autoIndex: true,
    minimize: false,
    timestamps: true,
  },
);

const db = mongoose.connection.useDb('portal');
module.exports = db.model('AuctionParticipants', AuctionParticipantsSchema, 'auctionParticipants');
