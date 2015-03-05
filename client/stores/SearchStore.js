var reflux = require('reflux');
var actions = require('../actions/Actions.js');
var agent = require('superagent-promise');


var _store = {
 pending: false,
 result: [],
 query: '',
}

function _search(query) {
 agent.get('/API/search', {query : query}).end()
 .then(function onResult(res) {
  _store.result = res.body.collections;
  _store.pending = false;
  SearchStore.trigger(_store);
 })
 .catch(function error(res) {
  _store.pending = false;
  _store.error = res;
 });
}


var SearchStore = reflux.createStore({
 getState: function () {
  return _store;
 },
 search: function(query) {
  _store.pending = true;
  _store.query = query;
  this.trigger(_store);
  _search(query);
 },
});

module.exports = SearchStore;
