var Opensearch = require('../clients/OpenSearch.client'),
    Promise = require('es6-promise').Promise;

module.exports = function (socket) {
  var _SearchPromise;
  return {
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
    emit : function (type) {
      _SearchPromise.then((result) => {
        console.log('emit');
        socket.emit(type, result)
      });
      return this;
    },
    add : function (cb) {
      _SearchPromise = _SearchPromise.then(cb);
      return this;
    },
    transformers : {},
  }
}
