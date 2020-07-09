const socketIo = require('socket.io');

const home = async (req, res) => {
  socketIo.emit('RELOAD_AUCTION');
  res.json({
    message: 'Welcome to portal API',
  });
};

module.exports = { home };
