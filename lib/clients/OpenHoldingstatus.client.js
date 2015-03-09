var baseclient = require('./Base.client'),
    config = baseclient.config.openholdingstatus;

var _default = {
 authentication : false,
 agencyId       : 'DK-870970',
 pid            : null,
 mergePids      : false,
}

var openHoldingsstatus = baseclient.client(config.wsdl, _default);

module.exports = {
  localisations : (pid) => { return openHoldingsstatus.call('localisations', {pid : pid})}
}
