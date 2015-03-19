var expressSession = require('express-session');
var session = expressSession({
      name : 'testhest', //remember to change
        secret: 'supernova', //remember to change
        saveUninitialized: true,
        resave: true
    });

module.exports = session;
