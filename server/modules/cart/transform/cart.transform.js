var _ = require('lodash');

module.exports = {
  getCartTransform: (response) => {
    var cartContent = {
      cartContentElements: {}
    };

    if(!_.isUndefined(response.cartContent)) {
      for(var key in response.cartContent) {
        var item = response.cartContent[key];
        var pid = item.cartContentElement;
        var id = item.cartContentId;

        cartContent.cartContentElements[pid] = {};
        cartContent.cartContentElements[pid].pid = pid;
        cartContent.cartContentElements[pid].id = id;
      }
    }

    return cartContent;
  }
};