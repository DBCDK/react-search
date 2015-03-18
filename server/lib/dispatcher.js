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
function Dispatcher(io) {
  //var socketServer = socketIo(app);
  //authentication(socketServer, session);
  io.on('connection', makeConnection);

  /**
   * Callback method for new connections
   * @param  {Socket} connection a new socket connection
   * @return {null}
   */
  function makeConnection(connection) {
    console.log(connection.request.session, 'session on connection');
    _listeners.map(listener => {
      connection.on(listener.type, (data) => {
        listener.callback(data, connection);
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
    listen: addListener,
    emitToUser : emitToUser,
  }
}

// Export Dispatcher module
module.exports = Dispatcher;
