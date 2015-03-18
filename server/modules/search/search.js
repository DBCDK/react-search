var transform = require('./transform/dkabm.js');
var opensearch = require('../../lib/clients/OpenSearch.client');

module.exports = function (dispatcher) {
  dispatcher.listen('searchRequest', (data, connection) => {
    opensearch.search(data.query)
    .then(transform)
    .then((result) => connection.emit('searchResult', result));
  });
};
