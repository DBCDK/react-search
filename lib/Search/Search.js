var Opensearch = require('../clients/OpenSearch.client'),
    Promise = require('es6-promise').Promise;

module.exports = function (socket) {
  var _SearchPromise;
  return {
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
      _SearchPromise = _SearchPromise.then((result) => {
        socket.emit(type, result)
        return result;
      });
      return this;
    },
    transformers : {},
  }
}
