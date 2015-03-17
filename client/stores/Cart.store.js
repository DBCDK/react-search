var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Socket = require('socket.io-client').connect();

var _store = {
  cart: {}
};

function _listen(callback) {
  Socket.on('cartResult', (data) => callback(data));
}

function _cartRequest(){
  Socket.emit('cartRequest', 'mmj@dbc.dk');
}

var CartStore = Reflux.createStore({
  getState: function(){
    return _store;
  },

  request: function(){
    _store = {
      pending: true,
      inCart: false
    };
    this.trigger(_store);
    _cartRequest();
  },

  result: function(result){
    console.log('callback', result);
  },

  init: function(){
    this.listenTo(Actions.cart, this.request);
    Socket.on('cartRequest', function(data) {
      console.log('cartRequest', data);
    });
    _listen(this.result);
  }
});

module.exports = CartStore;