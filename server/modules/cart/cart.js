var OpenUserInfo = require('../../lib/clients/OpenUserinfo.client');
var Transform = require('./transform/cart.transform');

module.exports = function(dispatcher) {
  dispatcher.listen('cartRequest', (data, connection) => {
    OpenUserInfo.cart.getCart(data)
      .then(Transform.getCartTransform)
      .then((result) => connection.emit('cartResult', result));
  });

  dispatcher.listen('addCartContent', (data, connection) => {
    let cartContent = {
      cartContent: {
        cartContentElement: data
      }
    };
    OpenUserInfo.cart.addCartContent(cartContent)
      .then((result) => connection.emit('addCartContentResult', result.cartContentId));
  });

  dispatcher.listen('removeCartContent', (data, connection) => {
    let cartContent = {
      cartContent: {
        cartContentId: data
      }
    };
    OpenUserInfo.cart.removeCartContent(cartContent)
      .then((result) => connection.emit('removeCartContentResult', result));
  });
};

