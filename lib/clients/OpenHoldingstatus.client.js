var client = require('./base.client'),
    config = client.config.openholdingstatus;

var _default = {
 action         : localisationsRequest,
 authentication : FALSE,
 agencyId       : 'DK-870970',
 pid            : null,
 mergePids      : false,
}

var opensearch = client(config.wsdl, _default);

module.exports = {
  localisations : (pid) => opensearch.call('localisations', {pid : pid})
}
