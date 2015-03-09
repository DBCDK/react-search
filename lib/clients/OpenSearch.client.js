var baseclient = require('./base.client'),
    config = baseclient.config.opensearch;

var _default = {
  agency : config.agency,
  profile : config.profile,
  start : 1,
  stepValue : 10
}

var opensearch = baseclient.client(config.wsdl, _default);

module.exports = {
  search : (query) => opensearch.call('search', {query : query}),
  objectGet : (pid) => opensearch.call('objectGet', {pid : pid})
}
