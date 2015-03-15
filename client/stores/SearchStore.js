var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var socket = require('socket.io-client').connect();

var _store = {
  pending: false,
  result: null,
  query: '',
}

function _listen(cb) {
  socket.on('searchResult', (data) => cb(data));
}

function _socketSearch(query) {
  socket.emit('searchRequest', {
    query: query
  });
}

var SearchStore = reflux.createStore({
  getState: function() {
    return _store;
  },
  search: function(query) {
    _store.pending = true;
    _store.query = query;
    _store.result = null;
    this.trigger(_store);
    _socketSearch(query);
  },
  result: function (result) {
    _store.pending = false;
    _store.result = result.collections;
    this.trigger(_store);
  },
  init: function() {
    this.listenTo(actions.search, this.search);
    _listen(this.result);
  },
});

module.exports = SearchStore;
