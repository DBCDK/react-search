var soap = require('soap');
var util = require('util');
var config = require.main.require('./config.js');
var Promise = require('es6-promise').Promise;

module.exports.config = config;
module.exports.client = function client(wsdl, config) {

  function _call(operation, query) {
    var options = util._extend(config, query);
    return new Promise(function(resolve, reject) {
      soap.createClient(wsdl, function(err, client) {
        if (err) {
          reject(err);
        } else {
          client[operation + 'Operation'](options, function(err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result.result);
            }
          });
        }
    });
    });
  }

  return {
      call: _call
  }
}
