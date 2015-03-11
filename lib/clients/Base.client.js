/**
 * @file
 * Module containing the logic for a soap client. The module is suposed to be
 * extended by a service client implentation
 */

var soap = require('soap');
var util = require('util');
var config = require.main.require('./config.js');
var Promise = require('es6-promise').Promise;
var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 1});

var BaseClient = {};
BaseClient.config = config;
BaseClient.client = function (wsdl, config, cache) {

  /**
   * Returns a promise for a new client
   * @param  {String} wsdl url for service wsdl
   * @return {Promise}
   */
  function _client(wsdl) {
    return new Promise((resolve, reject) => {
      // Create soap client from a given wsdl
      soap.createClient(wsdl, (err, client) => {
        // Resolve promise from result
        console.log('resolve client');

        client ? resolve(client) : reject(err);
      });
    });
  }

  /**
   * Returns a promise for a request
   * @param  {Object} client  soap client object
   * @param  {String} op      Action on service
   * @param  {Object} options Options for request
   * @return {Promise}
   */
  function _action(client, op, options) {
    var cachekey = op + JSON.stringify(options);
    return new Promise((resolve, reject) => {
      // Call to service is wrapped by the cache manager
      // that handles caching auto-magically
      memoryCache.wrap(cachekey, (callback) => {
        // No cache exists, make call to service
        client[op](options, callback);
      }, (err, result) => {
        // callback from service/cache
        (err) ? reject(err) : resolve(result);
      });
    });
  }

  /**
   * Make request to soap service
   * @param  {String} action  Type of request
   * @param  {Obejct} options map of options
   * @return {Promise}
   */
  function call(action, options) {
    return _client(wsdl).then(function (client) {
      var q = util._extend(config, options);
       return _action(client, action, q);
    });
  }

  // Return factory for making soap requests
  return {
    request: call
  }
}

module.exports = BaseClient;
