var expressSession = require('express-session');
var sessionStore = expressSession({
    secret: 'supernova',
    saveUninitialized: true,
    resave: true
  });
var cookieParser = require('cookie-parser');
var passportSocketIo = require("passport.socketio");

module.exports = function (io) {
  io.use(function(socket, next){
    socket.user = {};
    sessionStore(socket.request, {}, next);
  })
}
