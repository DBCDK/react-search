var Opensearch = require('../clients/OpenSearch.client'),
    Promise = require('es6-promise').Promise,
    _SearchPromise;

var Search  = {
  transform : function (template) {
    _SearchPromise = _SearchPromise.then(template);
    return this;
  },
  then : function (cb) {
   _SearchPromise = _SearchPromise.then(cb);
   return this;
  },
  catch : function (cb) {
   _SearchPromise = _SearchPromise.catch(cb);
  },
  get : function (query) {
    _SearchPromise = Opensearch.search(query);
    return this;
  },
  add : function (element) {
    _SearchPromise.then()
    return this;
  },
  transformers : {},
}

module.exports = Search;

