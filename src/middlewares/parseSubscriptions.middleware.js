const { parseMessage } = require('helpers');

module.exports = async (req, res, next) => {
  try {
    if (req.body && req.body.subscription) {
      req.body.message.data = parseMessage(req.body.message.data);
    }
    next();
  } catch (error) {
    next(error);
  }
};
