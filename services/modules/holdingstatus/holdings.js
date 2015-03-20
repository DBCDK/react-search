var transform = require('./transform/transformHoldings.js');
var openHoldingstatus = require('../../lib/clients/OpenHoldingstatus.client');
var _dispatcher;

module.exports = function (dispatcher) {
  dispatcher.listen('holdingsRequest', (data, connection) => {
    openHoldingstatus.holdings(data)
    .then(transform)
    .then((result) => connection.emit('holdingsResult', result));
  });
}
