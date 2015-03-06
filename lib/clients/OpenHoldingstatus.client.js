let client = require('./base.client'),
    config = client.config.opensearch;

if (!config) {
  throw('Opensearch configuration does not exist. does config.js exist in root folder?');
}

let _default = {
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
