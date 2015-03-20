var OpenUserInfo = require('../../lib/clients/OpenUserinfo.client');
var Transform = require('./transform/cart.transform');

module.exports.getCart = function(data, user) {

    return OpenUserInfo.cart.getCart(user.userId)
        .then(Transform.getCartTransform)
}

module.exports.addCartContent = function(data, user) {
    let cartContent = {
        cartContent: {
            cartContentElement: data
        },
        userId: user.userId
    };

    return OpenUserInfo.cart.addCartContent(cartContent);
}

module.exports.removeCartContent = function(data, user) {
    let cartContent = {
        cartContent: {
            cartContentId: data
        },
        userId: user.userId
    };

    return OpenUserInfo.cart.removeCartContent(cartContent);
}
