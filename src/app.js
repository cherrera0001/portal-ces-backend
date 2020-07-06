/* eslint-disable import/first */
const dotenv = require('dotenv');
const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();
const { GCP_PUBSUB_AUCTION_START_TOPIC_NAME, GCP_PUBSUB_AUCTION_RESPONSES_TOPIC_NAME } = process.env;
const rollbar = require('rollbar.js');
const pubSub = require('pubSub');
const auctionSubscriptionHandler = require('portal/subscriptions/auction.subscription.js');

// ############ INIT PUB/SUB SUBSCRIPTIONS ############
pubSub.subscribe({
  subscriptionName: GCP_PUBSUB_AUCTION_START_TOPIC_NAME,
  messageHandler: auctionSubscriptionHandler.auctionStart,
});
pubSub.subscribe({
  subscriptionName: GCP_PUBSUB_AUCTION_RESPONSES_TOPIC_NAME,
  messageHandler: auctionSubscriptionHandler.auctionResponses,
});
// ####################################################

rollbar.log('Server Loaded!');

const app = express();
app.use(rollbar.errorHandler());
app.use(methodOverride());
app.use(
  express.json({
    limit: '100mb',
  }),
);
app.use(
  express.urlencoded({
    limit: '100mb',
    extended: true,
  }),
);
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('', (req, res) => {
  res.json({
    message: 'Welcome to AMICAR Portal',
  });
});

app.use('', require('routes'));
app.use('/portal', require('portal/routes'));
app.use('/eficar', require('eficar/routes'));

module.exports = app;
