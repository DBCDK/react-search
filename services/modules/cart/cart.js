var OpenUserInfo = require('../../lib/clients/OpenUserinfo.client');
var Transform = require('./transform/cart.transform');

module.exports = function(dispatcher) {
  dispatcher.listen('cartRequest', (data, connection, user) => {
    OpenUserInfo.cart.getCart(user.userId)
      .then(Transform.getCartTransform)
      .then((result) => connection.emit('cartResult', result));
  });

  dispatcher.listen('addCartContent', (data, connection, user) => {
    let cartContent = {
      cartContent: {
        cartContentElement: data
      },
      userId : user.userId
    };
    OpenUserInfo.cart.addCartContent(cartContent)
      .then((result) => connection.emit('addCartContentResult', result.cartContentId));
  });

  dispatcher.listen('removeCartContent', (data, connection, user) => {
    let cartContent = {
      cartContent: {
        cartContentId: data
      },
      userId : user.userId
    };
    OpenUserInfo.cart.removeCartContent(cartContent)
      .then((result) => connection.emit('removeCartContentResult', result));
  });
};

