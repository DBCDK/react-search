var baseclient = require('./Base.client'),
    config = baseclient.config.openholdingstatus;

var _default = {}

var openHoldingsstatus = baseclient.client(config.wsdl, _default);

module.exports = {
    holdings: (pid) => {
       console.log(pid);
        return openHoldingsstatus.call('holdingsService', {
            lookupRecord: {
                responderId: '715300',
                pid: pid,
            }
        });
    }
}
