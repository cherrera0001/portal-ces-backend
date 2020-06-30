const aqp = require('api-query-params');
const Auction = require('amidoc/models/auction.model');

const all = async (req, res) => {
  const { filter, skip, limit, sort, projection, population } = aqp({ ...req.query });
  const auctions = await Auction.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population);

  const total = await Auction.find(filter).select(projection);

  res.json({
    total: total.length,
    result: auctions,
  });
};

const create = async (req, res) => {
  const auction = new Auction({ ...req.body });
  auction.save();
  res.status(201).end();
};

module.exports = { all, create };
