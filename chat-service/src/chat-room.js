const { v4: uuid } = require("uuid");

module.exports = class {
  constructor() {
    this.sockets = [];
    this.messages = [];
  }

  add(socket) {
    this.sockets.push(socket);
  }

  remove(socket) {
    const idx = this.sockets.indexOf(socket);
    this.sockets.splice(idx, 1);
  }

  broadcast(input) {
    const message = { id: uuid(), timestamp: Date.now(), ...JSON.parse(input) };
    this.messages.push(message);
    
    const serialized = JSON.stringify(message);
    for (const socket of this.sockets) {
      socket.send(serialized);
    }
  }

  latestMessages() {
    return this.messages.slice(this.messages.length - 10);
  }
};
