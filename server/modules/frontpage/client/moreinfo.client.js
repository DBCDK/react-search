var baseclient = require('../../../lib/Base.client'),
  config = baseclient.config.moreinfo,
  _default = {
    authentication: {
      authenticationUser: config.user,
      authenticationGroup: config.group,
      authenticationPassword: config.password
    }
  },
  moreinfo = baseclient.client(config.wsdl, _default);

module.exports = {
  info: (pid) => moreinfo.request('moreInfo', {
    identifier: {
      localIdentifier: pid.split(':').pop()
    }
  })
}
