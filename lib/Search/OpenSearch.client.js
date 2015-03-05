var soap = require('soap');
var util = require('util');
var Promise = require('es6-promise').Promise;
var config = require.main.require('./config.js').opensearch;

console.log(config,'config');
if (!config) {
  throw('Opensearch configuration does not exist. does config.js exist in root folder?');
}

var url = config.wsdl;

var _default = {
  agency : config.agency,
  profile : config.profile,
  start : 1,
  stepValue : 10
}

module.exports = function (query){
  console.log(query, 'q');
  var options =  util._extend(_default, {query : query});
  return new Promise(function (resolve, reject) {
    soap.createClient(url, function(err, client) {
      if (err) {
        reject(err);
      }
      else {
        client.searchOperation(options, function(err, result) {
          if (err) {
           reject(err);
         }
         else {
          resolve(result.result);
        }
      });
      }
    });
  });
}
