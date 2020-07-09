const socketIo = require('socket.io');

class SocketService {
  constructor(server) {
    this.io = socketIo(server);
  }

  emiter(event, body) {
    if (body) this.io.emit(event, body);
  }
}

module.exports = SocketService;
