var baseclient = require('../../../lib/base.client'),
    config = baseclient.config.opensearch;

var _default = {
  agency : config.agency,
  profile : config.profile,
  start : 1,
  stepValue : 10,
  sort : 'rank_frequency',
  collectionType : 'manifestation'
}

var opensearch = baseclient.client(config.wsdl, _default);

module.exports = {
  search : (query) => opensearch.request('searchOperation', {query : query}),
  objectGet : (pid) => opensearch.request('objectGet', {pid : pid})
}
