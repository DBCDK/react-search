/**
 * It is possible for the server application to set the URI for the socket connection.
 * This is neccesary if the client application is embedded as a widget
 *
 * @type {String}
 */
var socketUri = window && window._socketUri || null;
var socket = require('socket.io-client').connect(socketUri);

var clientSocketEmitter = function(type) {
 function request(data) {
   socket.emit(type + 'Request', data);
 }

 function response(cb) {
  socket.on(type + 'Response', (data) => cb(data));
 }

 return {
  request : request,
  response : response
 }
};

module.exports = clientSocketEmitter;
