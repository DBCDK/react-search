var authenticate = require('authenticate');


module.exports = function(options) {
    return function authenticate(socket, next) {
      socket.user = 'static.user';
      next();
    }
}
