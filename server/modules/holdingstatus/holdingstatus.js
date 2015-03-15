var OpenHoldingstatus = require('../clients/OpenHoldingstatus.client'),
  _ = require('lodash'),
  Promise = require('es6-promise').Promise;

function mutateHoldingsResponse(response) {
  if (response.responder) {
    let holding = response.responder;
    return {
      pid : holding.pid,
      home : Date.parse(Date().slice(0, 15)) <= Date.parse(holding.expectedDelivery),
      willLend : (response.responder.willLend === 'true'),
      expectedDelivery : (new Date(holding.expectedDelivery)).toLocaleDateString(),
    }
  } else {
    let holding = response.error;
      return {
        pid : holding.pid,
        home : false,
        willLend : false,
        error : true,
        errorMessage : holding.errorMessage
    }
  }
}

var HoldingStatus = {
  get: function(result) {
    var collections = result.collections;
    var ids = collections.map(collection => collection.id);

    return Promise.all(ids.map(HoldingStatus.request)).then((response) => {
      var holdings = response.map(mutateHoldingsResponse);
      result.collections = HoldingStatus.combine(collections, holdings);
      return Promise.resolve(result);
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
  combine : function (collections, holdings) {
    return collections.map((collection) => {
       collection.holdings = holdings.filter((holding) => {
          return (holding.pid === collection.id)
       }).shift();
       return collection;
     });
  },

  request: function(id) {
    return OpenHoldingstatus.holdings(id);
  }
}

module.exports = function () {
  return {
    get : HoldingStatus.get
  }
}
