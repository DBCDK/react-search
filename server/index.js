module.exports = function(io){
  //initiate dispatcher
  var dispatcher = require('./lib/dispatcher')(io);
  ///Load Modules
  require('./modules/search/search.js')(dispatcher);
  require('./modules/holdingstatus/holdings.js')(dispatcher);
  require('./modules/frontpage/frontpage.js')(dispatcher);
  require('./modules/cart/cart.js')(dispatcher);
};
