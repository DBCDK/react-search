var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var emitter = require('../clientSocketEmitter/clientSocketEmitter');

var _store = {
  pending: false,
  result: null,
  query: '',
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
    emitter('search').request({
      query: query
    });
  },
  result: function (result) {
    _store.pending = false;
    _store.result = result.collections;
    this.trigger(_store);
  },
  init: function() {
    this.listenTo(actions.search, this.search);
    emitter('search').response(this.result);
  },
});

module.exports = SearchStore;
