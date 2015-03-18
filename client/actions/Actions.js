var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'search',
  'holdings',
  'frontpage',
  'getCart',
  'addCartContent',
  'removeCartContent',
  'login',
  'logout'
]);

module.exports = Actions;
