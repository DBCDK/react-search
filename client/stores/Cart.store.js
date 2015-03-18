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
  Socket.emit('cartRequest', 'mmj@dbc.dk');
}

var CartStore = Reflux.createStore({
  getState: function() {
    return _store;
  },

  request: function() {
    if(!_store.pending) {
      console.log('request');
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

  addCartContentResult: function(data, pid){

    console.log(_store);
    console.log(this);

    _store.cart[pid] = {};
    _store.cart[pid].pid = pid;
    _store.cart[pid].id = data;

    this.trigger(_store);
  },

  addCartContent: function(pid) {
    Socket.on('addCartContentResult', (data) => this.addCartContentResult(data, pid));
    Socket.emit('addCartContent', pid);
  },

  init: function() {
    this.listenTo(Actions['getCart'], this.request);
    this.listenTo(Actions['addCartContent'], this.addCartContent);
    _listen(this.result);
  }
});

module.exports = CartStore;