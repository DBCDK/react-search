//var transform = require('./transform/transformImages.js');
var moreinfo = require('./client/moreinfo.client');
var _dispatcher;

module.exports = function (dispatcher) {
  dispatcher.listen('frontpageRequest', (data, connection) => {
    moreinfo.info(data.pid)
    //.then(transform)
    .then((result) => connection.emit('frontpageResult', result));
  });
}
