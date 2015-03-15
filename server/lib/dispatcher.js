var socketIo = require('socket.io');
var _socket;
var _listeners = new Array();

function Dispatcer(server) {
  socketIo(server).on('connection', makeConnection);

  function makeConnection(connection) {
    _listeners.map(listener => {
      connection.on(listener.type, (data) => {
        listener.callback(data, connection);
      });
    });
  }

  function addListener(type, callback) {
    _listeners.push({
      type: type,
      callback: callback
    });
  }

  return {
    listen: addListener
  }
}

module.exports = Dispatcer;
