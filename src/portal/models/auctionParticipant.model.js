const mongoose = require('mongoPortal')();

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

module.exports = mongoose.model('AuctionParticipants', AuctionParticipantsSchema, 'auctionParticipants');
