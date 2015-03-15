var transform = require('./transform/dkabm.js');
var opensearch = require('./client/OpenSearch.client');
var _dispatcher;

module.exports = function (dispatcher) {
  dispatcher.listen('searchRequest', (data, connection) => {
    opensearch.search(data.query)
    .then(transform)
    .then((result) => connection.emit('searchResult', result));
  });
}
