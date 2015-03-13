var baseclient = require('./Base.client'),
  config = baseclient.config.openholdingstatus,
  _default = {},
  openHoldingsstatus = baseclient.client(config.wsdl, _default);

module.exports = {
  holdings: (pid) => openHoldingsstatus.request('holdingsService', {
    lookupRecord: {
      responderId: '714700',
      pid: pid,
    }
  })
}
