/**
 * @file
 * Module containing the logic for a soap client. The module is suposed to be
 * extended by a service client implentation
 */

var soap = require('soap');
var util = require('util');
var config = require('../../config.js');
var Promise = require('es6-promise').Promise;
var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 100});

var BaseClient = {};
BaseClient.config = config;
BaseClient.client = function (wsdl, config, cache) {
  var _soapclient;

  /**
   * Returns a promise for a new client
   * @param  {String} wsdl url for service wsdl
   * @return {Promise}
   */
  function _client(wsdl) {
    return new Promise((resolve, reject) => {
      if (_soapclient) {
        resolve(_soapclient);
      }
      // Create soap client from a given wsdl
      soap.createClient(wsdl, (err, client) => {
        // Resolve promise from result
        if (err) {
          reject(err)
        }
        else {
          _soapclient = client
          resolve(client);
        }
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
    return new Promise((resolve, reject) => {
      // Call to service is wrapped by the cache manager
      // that handles caching auto-magically
      var query = util._extend({}, options);
      _actionWithCache(client[op], query, (err, result) => {
          (err) ? reject(err) : resolve(result);
        });
    });
  }
  function _actionWithCache(call, options, callback) {
      var cachekey = JSON.stringify(options);
      memoryCache.wrap(cachekey, (cb) => {
          call(options, cb);
        }, callback);
  }
  /**
   * Make request to soap service
   * @param  {String} action  Type of request
   * @param  {Object} options map of options
   * @return {Promise}
   */
  function call(action, options) {
    return _client(wsdl).then(function (client) {
      var o = util._extend(config, options);
      return _action(client, action, o);
    });
  }

  // Return factory for making soap requests
  return {
    request: call
  }
}

module.exports = BaseClient;
