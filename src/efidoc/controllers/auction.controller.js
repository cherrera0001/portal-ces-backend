const Auction = require('../model/auction.model');

const all = async (req, res) => {
    const auctions = await Auction.find();
    res.json(auctions);
}

const create = async (req, res) => {
    const auction = new Auction({ ... req.body });
    auction.save();
    res.status(201).end();
}

module.exports = { all, create }