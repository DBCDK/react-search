var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var socket = require('socket.io-client').connect();

var _store = {
  holdings: {}
}

function _listen(cb) {
  socket.on('frontpageResult', (data) => cb(data));
}

function _frontpageRequest(pid) {
  socket.emit('frontpageRequest', {
    pid: pid,
  });
}

var FrontpageStore = reflux.createStore({
  getState: function() {
    return _store;
  },
  request: function(pid) {
    _store[pid] = {
      pending : true,
      images : null,
    };
    this.trigger(_store);
    _frontpageRequest(pid);
  },
  result: function (result) {
    console.log(result);
    //_store[result.pid].pending = false;
    //_store[result.pid].images = result.images;
    //this.trigger(_store);
  },
  init: function() {
    this.listenTo(actions.frontpage, this.request);
    _listen(this.result);
  },
});

module.exports = FrontpageStore;
