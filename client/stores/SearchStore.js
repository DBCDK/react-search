var reflux = require('reflux');
var actions = require('../actions/Actions.js');
//var agent = require('superagent-promise');
var socket = require('socket.io-client').connect();


var _store = {
  pending: false,
  result: null,
  query: '',
}

function _listen(cb) {
  socket.on('search', (data) => cb(data));
}

/*function _search(query) {
  _socketSearch(query);
  agent.get('/API/search', {
      query: query,
      holdings: true
    }).end()
    .then(function onResult(res) {
      _store.result = res.body.collections;
      console.log(_store);
      _store.pending = false;
      SearchStore.trigger(_store);
    })
    .catch(function error(res) {
      _store.pending = false;
      _store.error = res;
    });
}*/

function _socketSearch(query) {
  socket.emit('search', {
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
    //_search(query);
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
