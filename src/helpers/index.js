module.exports = {
  parseMessage: (message) => JSON.parse(Buffer.from(message, 'base64').toString()),
};
