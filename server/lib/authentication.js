/**
 * @file
 * authentication workflow
 *
 * inspired by:
 * https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/
 */

var session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {
    app.use(session({
        secret: 'supernova',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log('hest');
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

}

//passport.use('local-signin', () => console.log);

