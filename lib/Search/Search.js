var Opensearch = require('./OpenSearch.client'),
    Promise = require('es6-promise').Promise,
    _SearchPromise;

var Search  = {
  transform : function (template) {
    console.log(template);
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
    console.log(query, 'search q');
    _SearchPromise = Opensearch(query);
    return this;
  },
  add : function (element) {
    _SearchPromise.then()
    return this;
  },
  transformers : {},
}

module.exports = Search;

