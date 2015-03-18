var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'search', 'holdings', 'frontpage', 'getCart', 'addCartContent'
]);

module.exports = Actions;
