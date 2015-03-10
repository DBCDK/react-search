var OpenHoldingstatus = require('../clients/OpenHoldingstatus.client'),
    Promise = require('es6-promise').Promise,
    _SearchPromise;

var HoldingStatus  = {
  getIds : function (result) {
     return result.collections.map(collection => {return collection.id});
  },
  get : function (result) {
    return HoldingStatus.getIds(result).map((id) => HoldingStatus._call(id));
  },
  _call : function (id) {
     return OpenHoldingstatus.holdings(id);
  }
}

module.exports = HoldingStatus;

