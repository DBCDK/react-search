var baseclient = require('../../../lib/Base.client');
var config = baseclient.config.openuserinfo;
var _default = {};
var openUserinfo = baseclient.client(config.wsdl, _default);

module.exports = {
  cart: (query) => {
    openUserinfo.request('getCart', {
      lookupRecord:query
    })
  }
};