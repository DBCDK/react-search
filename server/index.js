module.exports = function (server, session) {
  //initiate dispatcher
  var dispatcher = require('./lib/dispatcher')(server, session);
  ///Load Modules
  require('./modules/login/login.module.js')(dispatcher);
  require('./modules/search/search.js')(dispatcher);
  require('./modules/holdingstatus/holdings.js')(dispatcher);
  require('./modules/frontpage/frontpage.js')(dispatcher);
  require('./modules/cart/cart.js')(dispatcher);
};
