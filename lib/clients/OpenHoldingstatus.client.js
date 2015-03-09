var baseclient = require('./Base.client'),
    config = baseclient.config.openholdingstatus;

var _default =
{ lookupRecord :
{
    responderId: '715300',
    pid: null
}
}

var openHoldingsstatus = baseclient.client(config.wsdl, _default);

module.exports = {
    holdings: (pid) => {
        _default.lookupRecord.pid = pid;
        return openHoldingsstatus.call('holdingsService', _default);
    }
}
