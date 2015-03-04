var express = require('express'),
    path = require('path'),
    exphbs  = require('express-handlebars'),
    routes = require('./routes/index'),
    app = express(),
    helpers = require('./lib/helpers');


var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers      : helpers,

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
/*    partialsDir: [
        'shared/templates/',
        'views/partials/'
    ]*/
});
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', express.static(__dirname + '/dist'));
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
if (app.get('env') === 'development') {
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

app.listen(4001, function () {
    console.log('express-handlebars example server listening on: 3000');
});
