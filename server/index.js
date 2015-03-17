module.exports = function (server) {
  //initiate dispatcher
  var dispatcher = require('./lib/dispatcher')(server);
  ///Load Modules
  require('./modules/search/search.js')(dispatcher);
  require('./modules/holdingstatus/holdings.js')(dispatcher);
  require('./modules/frontpage/frontpage.js')(dispatcher);
  require('./modules/cart/cart.js')(dispatcher);
};
