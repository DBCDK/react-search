var soap = require('soap');
var util = require('util');
var config = require.main.require('./config.js');
var Promise = require('es6-promise').Promise;
var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 3600 * 24});


module.exports.config = config;
module.exports.client = function client(wsdl, config, cache) {
  function _client(wsdl) {
    return new Promise((resolve, reject) => {
      soap.createClient(wsdl, (err, client) => {
        client ? resolve(client) : reject(err);
      });
    });
  }

  function _action(client, action, options) {
    var  op = action + 'Operation',
    cachekey = action + JSON.stringify(options);

    return new Promise((resolve, reject) => {
      memoryCache.wrap(cachekey, (callback) => {
        client[op](options, callback);
      }, (err, result) => {
        (err) ? reject(err) : resolve(result.result);
      });
    });
  }
  function _cache (key, cb) {

  }

  function call(action, query) {
    var options = util._extend(config, query);
    return _client(wsdl).then(client => _action(client, action, options));
  }
  return {
    call: call
  }
}
