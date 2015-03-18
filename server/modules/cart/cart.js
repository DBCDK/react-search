var OpenUserInfo = require('../../lib/clients/OpenUserinfo.client');
var Transform = require('./transform/cart.transform');

module.exports = function(dispatcher) {
  dispatcher.listen('cartRequest', (data, connection) => {
    OpenUserInfo.cart(data)
      .then(Transform.getCartTransform)
      .then((result) => connection.emit('cartResult', result));
  });
};