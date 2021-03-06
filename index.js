// Convert es6 to es5
require("babel/register");

// Import dependencies
var express = require('express'),
  io = require('socket.io'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  path = require('path'),
  exphbs = require('express-handlebars'),
  routes = require('./routes/routes'),
  app = express(),
  server = require('http').Server(app),
  socket = io(server),
  authentication = require('./lib/authentication/authentication'),
  handlebars_helpers = require('./lib/handlebars/helpers'),
  services = require('dbc-node-services');

//Initialize api
services.init(socket);

// Initialize authentication
authentication.express(app);
authentication.io(socket);

// Setup express env
app.set('port', process.env.PORT || 3000);

// Setup view engine
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: handlebars_helpers
});

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup helpers
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Setup routing
app.use('/', express.static(__dirname + '/public'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/', express.static(__dirname + '/static'));
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Startup server
server.listen(app.get('port'), function() {
  console.log('Server listening on ' + app.get('port'));
});
