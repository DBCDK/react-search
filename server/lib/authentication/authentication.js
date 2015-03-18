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
    openUserInfo = require('../clients/OpenUserinfo.client');

module.exports = function(app) {
  var session = expressSession({
      name : 'testhest',
        secret: 'supernova',
        saveUninitialized: true,
        resave: true
    });
    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());

  passport.use(new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'username',
    passwordField: 'password'
  },
  function(req, username, password, done) {
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
));

    // Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

//===============PASSPORT=================
// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.userId);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

}
