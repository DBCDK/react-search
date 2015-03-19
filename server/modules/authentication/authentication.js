/**
 * @file
 * authentication workflow
 *
 * inspired by:
 * https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/
 */
var expressSession = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    openUserInfo = require('../../lib/clients/OpenUserinfo.client');

var session = expressSession({
      name : 'testhest', //remember to change
        secret: 'supernova', //remember to change
        saveUninitialized: true,
        resave: true
    });

module.exports.express = function(app) {
    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports.io = function(io) {
  io.use(function(socket, next){
    session(socket.request, {}, next);
  });
}

function _login(req, username, password, done) {
    var credentials = {name : username, password : password}
    openUserInfo.user.login(credentials)
    .then((result) => {
      if (result.userId) {
         req.session.success = 'You are successfully logged in with ' + result.userId;
         done (null, result);
      }
      else if (result.error){
        req.session.error = result.error;
        done (null, null);
      }
    })
    .catch((error) => console.log);
  }

//===============PASSPORT=================
passport.use(new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'username',
    passwordField: 'password'
  }, _login)
);
// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
