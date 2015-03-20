var expressSession = require('express-session');
var config = require.main.require('./config').session;
var session = expressSession({
      name : config.name,
      secret: config.secret,
      saveUninitialized: true,
      resave: true
    });

module.exports = session;
