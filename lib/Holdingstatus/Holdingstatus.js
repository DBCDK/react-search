var OpenHoldingstatus = require('../clients/OpenHoldingstatus.client'),
  _ = require('lodash'),
  Promise = require('es6-promise').Promise;

var HoldingStatus = {
  getIds: function(result) {
    return result.collections.map(collection => {
      return collection.id
    });
  },
  get: function(result) {
    var ids = HoldingStatus.getIds(result);
    return new Promise((resolve, reject) => {
      HoldingStatus.getFromService(ids).then((response) => {
        result.collections = HoldingStatus.mergeArraysOnId(result.collections, response);
        console.log('HoldingStatus', result);
        resolve(result);
      });
    });
  },
  /**
   * Map result from holdingstatus with search result
   *
   * Holdings are added as a key value 'Holdings' to each collection in the
   * search result array
   *
   * @param  {Array} result   Search result
   * @param  {Array} holdings Holdings result
   * @return {Array}
   */
  mergeArraysOnId : function (result, holdings) {
    return result.map(function(resultElement){
       resultElement.holdings = _.find(holdings, (holdingElement) => {
        if (holdingElement.responder) {
          return (holdingElement.responder.pid == resultElement.id)
        }
        else if (holdingElement.error) {
         return (holdingElement.error.pid == resultElement.id)
        }
     });
      return resultElement;
    });
  },
  getFromService: function(ids) {
    return Promise.all(ids.map((id) => HoldingStatus._call(id)));
  },
  _call: function(id) {
    return OpenHoldingstatus.holdings(id);
  }
}

module.exports = HoldingStatus;
