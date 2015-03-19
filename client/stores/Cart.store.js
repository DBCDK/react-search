var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();
var _ = require('lodash');

var _store = {
  pending: false,
  cart: {}
};

function _listen(callback) {
  Socket.on('cartResult', (data) => callback(data));
}

function _cartRequest() {
  Socket.emit('cartRequest');
}

var CartStore = Reflux.createStore({
  getState: function() {
    return _store;
  },

  request: function() {
    if(!_store.pending) {
      _cartRequest();
      _store.pending = true;
      this.trigger(_store);
    }
  },

  result: function(result) {
    _store.pending = false;
    _store.cart = result.cartContentElements;
    this.trigger(_store);
  },

  addCartContentResult: function(data, pid) {
    _store.cart[pid] = {};
    _store.cart[pid].pid = pid;
    _store.cart[pid].id = data;

    this.trigger(_store);
  },

  addCartContent: function(pid) {
    Socket.once('addCartContentResult', (data) => this.addCartContentResult(data, pid));
    Socket.emit('addCartContent', pid);
  },

  removeCartContent: function(cartId, pid) {
    if(cartId) {
      Socket.once('removeCartContentResult', (data) => this.removeCartContentResult(data, pid));
      Socket.emit('removeCartContent', cartId);
    }
  },

  removeCartContentResult: function(data, pid){
    delete _store.cart[pid];
    this.trigger(_store);
  },

  init: function() {
    this.listenTo(Actions['getCart'], this.request);
    this.listenTo(Actions['addCartContent'], this.addCartContent);
    this.listenTo(Actions['removeCartContent'], this.removeCartContent);
    _listen(this.result);
  }
});

module.exports = CartStore;
