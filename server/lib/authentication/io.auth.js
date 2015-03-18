var passportSocketIo = require("passport.socketio");
var cookieParser = require('cookie-parser')


module.exports = function (io, sessionStore) {
  io.use(function(socket, next){
    sessionStore(socket.request, {}, next);
  })
}
