var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var emitter = require('../clientSocketEmitter/clientSocketEmitter');

var _store = {
}

var FrontpageStore = reflux.createStore({
  getState: function() {
    return _store;
  },
  request: function(pid) {
    _store[pid] = {
      pending : true,
      images : [],
    };
    this.trigger(_store);
    emitter('getImages').request({
      pid: pid,
    });
  },
  result: function (result) {
    _store[result.pid].pending = false;
    _store[result.pid].images = result.images;
    this.trigger(_store);
  },
  init: function() {
    this.listenTo(actions.frontpage, this.request);
    emitter('getImages').response(this.result);
  },
});

module.exports = FrontpageStore;
