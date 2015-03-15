var baseclient = require('../../../lib/Base.client'),
  config = baseclient.config.openholdingstatus,
  _default = {},
  openHoldingsstatus = baseclient.client(config.wsdl, _default);

module.exports = {
  holdings: (query) => openHoldingsstatus.request('holdingsService', {
    lookupRecord: query
  })
}
