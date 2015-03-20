var search = require('./modules/search/search.js');
var holdings = require('./modules/holdingstatus/holdings.js');
var frontpage = require('./modules/frontpage/frontpage.js');
var cart = require('./modules/cart/cart.js');
var dispatcher = require('./lib/dispatcher')();

module.exports = function(io) {
  //initiate dispatcher
  dispatcher.init(io);

  // Setup search listeners
  dispatcher.listen('search', search.search)

  // Setup Cart listeners
  dispatcher.listen('getCart', cart.getCart)
  dispatcher.listen('addCartContent', cart.addCartContent)
  dispatcher.listen('removeCartContent', cart.removeCartContent)

  //Setup frontpage listeners
  dispatcher.listen('getImages', frontpage.getImages);

  //Setup holdings listeners
  dispatcher.listen('getHoldings', holdings.getHoldings);
};
