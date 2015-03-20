var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var socket = require('socket.io-client').connect();

var _store = {
  holdings: {}
}

function _listen(cb) {
  socket.on('getHoldingsResponse', (data) => cb(data));
}

function _holdingsRequest(pid) {
  socket.emit('getHoldingsRequest', {
    pid: pid,
    responderId : '714700'
  });
}

var HoldingStore = reflux.createStore({
  getState: function() {
    return _store;
  },
  request: function(pid) {
    _store[pid] = {
      pending : true,
      holding : null
    };
    this.trigger(_store);
    _holdingsRequest(pid);
  },
  result: function (result) {
    _store[result.pid].pending = false;
    _store[result.pid].holding = result;
    this.trigger(_store);
  },
  init: function() {
    this.listenTo(actions.holdings, this.request);
    _listen(this.result);
  }
});

module.exports = HoldingStore;
