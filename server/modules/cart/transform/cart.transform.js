var _ = require('lodash');

module.exports = (response) => {
  var inCartArr = [];
  if(!_.isUndefined(response.cartContent)) {
    for(var key in response.cartContent) {
      var item = response.cartContent[key];
      inCartArr.push(item.cartContentElement);
    }
  }

  return inCartArr;
};