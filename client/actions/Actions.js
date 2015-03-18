var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'search', 'holdings', 'frontpage', 'getCart', 'addCartContent', 'login', 'logout'
]);

module.exports = Actions;
