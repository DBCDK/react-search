var expressSession = require('express-session');
var sessionStore = expressSession({
    name: "COOKIE_NAME_HERE",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  });
var cookieParser = require('cookie-parser');
var passportSocketIo = require("passport.socketio");

module.exports = function (io) {
  io.use(function(socket, next){
    socket.user = {};
    sessionStore(socket.request, {}, next);
  })
}
