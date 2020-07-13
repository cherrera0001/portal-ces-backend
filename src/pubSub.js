const { PubSub } = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const subscriberOptions = { flowControl: { maxMessages: 1 } };

const subscribe = async ({ subscriptionName, messageHandler }) => {
  try {
    const subscription = pubSubClient.subscription(subscriptionName, subscriberOptions);
    subscription.on('message', messageHandler);
    return;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { subscribe };
