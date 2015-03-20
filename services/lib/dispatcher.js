var session = require('./session');

/**
 * Contains all eventlisteners that should be instantiated on new connections
 * @type {Array}
 */
var _listeners = new Array();
var _connections = new Array();

/**
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 *
 * @param {[Object]} server a node http server is needed to initialize socket.io
 */
function Dispatcher() {

  /**
   * Initialize dispatcher with a socket.io server
   * @param  {IoSocketServer} io instance of socket.io
   * @return {null}
   */
  function init(io) {
    io.on('connection', makeConnection);
  }

  /**
   * Callback method for new connections
   * @param  {Socket} connection a new socket connection
   * @return {null}
   */
  function makeConnection(connection) {
    var user = connection.request.session.passport && connection.request.session.passport.user || null;
    _listeners.map(listener => {
      connection.on(listener.type + 'Request', (data) => {
        console.log(listener.type);
        listener.callback(data, user)
          .then((data) => {
            connection.emit(listener.type + 'Response', data);
          });
      });
    });
  }

  /**
   * Add new listener
   *
   * Listeners are added to an array of listeners that will be initiated on
   * new connections
   *
   * @param {String}   type     Type of event to listen for
   * @param {Function} callback Callback function on event
   */
  function addListener(type, callback) {
    _listeners.push({
      type: type,
      callback: callback
    });
  }

  function emitToUser(user, type, data) {
    var connections = getUserConnections(user);
    connections.map((connection) => connection.emit(type, data));
  }

  function getUserConnections(user) {
    return _connections.filter((connection) => connection.user == user);
  }

  // Return factory, with a method for adding an event listener
  return {
    init: init,
    listen: addListener,
    emitToUser: emitToUser
  }
}

// Export Dispatcher module
module.exports = Dispatcher;
