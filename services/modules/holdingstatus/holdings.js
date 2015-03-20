var transform = require('./transform/transformHoldings.js');
var openHoldingstatus = require('../../lib/clients/OpenHoldingstatus.client');

module.exports.getHoldings = function (data, user) {

 return openHoldingstatus.holdings(data)
 .then(transform);
}
