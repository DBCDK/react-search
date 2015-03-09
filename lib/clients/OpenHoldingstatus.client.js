var baseclient = require('./Base.client'),
    config = baseclient.config.openholdingstatus;

var _default =
{ lookupRecord :
{
    responderId: '710100',
    bibliographicRecordAgencyId: '870970',
    bibliographicRecordId: null,
    mergePids: false,
}
}

var openHoldingsstatus = baseclient.client(config.wsdl, _default);

module.exports = {
    localisations: (pid) => {
        _default.lookupRecord.bibliographicRecordId = pid;
        return openHoldingsstatus.call('holdingsService', _default);
    }
}
