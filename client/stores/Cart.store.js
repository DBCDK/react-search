var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();

var _store = {
  pending: false,
  cart: []
};

function _listen(callback) {
  Socket.on('cartResult', (data) => callback(data));
}

function _cartRequest() {
  console.log('cartRequest');
  Socket.emit('cartRequest', 'mmj@dbc.dk');
}

var CartStore = Reflux.createStore({
  getState: function() {
    return _store;
  },

  request: function() {
    console.log('request', _store);
    if(!_store.pending) {
      _cartRequest();
      _store.pending = true;
      this.trigger(_store);
    }
  },

  result: function(result) {
    console.log(result);
    _store.pending = false;
    _store.cart = result;
    this.trigger(_store);
  },

  addCartContent: function(pid) {
    console.log(pid);
    Socket.emit('addCartContent', pid);
  },

  init: function() {
    this.listenTo(Actions['getCart'], this.request);
    this.listenTo(Actions['addCartContent'], this.addCartContent);
    _listen(this.result);
  }
});

module.exports = CartStore;