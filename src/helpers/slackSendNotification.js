const axios = require('axios');

const { SLACK_AMICES_NOTIFICATION_CHANEL } = process.env;

module.exports = async (message) => {
  try {
    await axios({ method: 'post', data: { text: message }, url: SLACK_AMICES_NOTIFICATION_CHANEL });
    return;
  } catch (err) {
    console.error(`ERROR SEND SLACK NOTIFICATION: ${err.message}`);
  }
};
