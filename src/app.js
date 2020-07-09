/* eslint-disable import/first */
const dotenv = require('dotenv');
const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();
const {
  GCP_PUBSUB_AUCTION_START_SUBSCRIPTION_NAME,
  GCP_PUBSUB_AUCTION_FINISH_SUBSCRIPTION_NAME,
  GCP_PUBSUB_AUCTION_RESPONSES_SUBSCRIPTION_NAME,
  GCP_PUBSUB_SIMULATION_SAVE_SUBSCRIPTION_NAME,
} = process.env;
const rollbar = require('rollbar.js');
const pubSub = require('pubSub');
const auctionSubscriptionHandler = require('portal/subscriptions/auction.subscription');
const simulationSubscriptionHandler = require('portal/subscriptions/simulation.subscription');

// ############ INIT PUB/SUB SUBSCRIPTIONS ############
pubSub.subscribe({
  subscriptionName: GCP_PUBSUB_AUCTION_START_SUBSCRIPTION_NAME,
  messageHandler: auctionSubscriptionHandler.auctionStart,
});
pubSub.subscribe({
  subscriptionName: GCP_PUBSUB_AUCTION_RESPONSES_SUBSCRIPTION_NAME,
  messageHandler: auctionSubscriptionHandler.auctionResponses,
});
pubSub.subscribe({
  subscriptionName: GCP_PUBSUB_AUCTION_FINISH_SUBSCRIPTION_NAME,
  messageHandler: auctionSubscriptionHandler.auctionFinish,
});
pubSub.subscribe({
  subscriptionName: GCP_PUBSUB_SIMULATION_SAVE_SUBSCRIPTION_NAME,
  messageHandler: simulationSubscriptionHandler.simulationSave,
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
