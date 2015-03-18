var baseclient = require('./Base.client');
var config = baseclient.config.openuserinfo;

var _default = {
  securityCode: config.securityCode,
  outputType: 'soap'
};
var openUserinfo = baseclient.client(config.wsdl, _default);

var options = {
  endpoint: config.endpoint
};

module.exports = {
  cart: {
    getCart: (user) => openUserinfo.request('getCart', {userId: user}, options, true),
    addCartContent: (content) => openUserinfo.request('addCartContent', content, options, true)
  }
  user : {
    login : (user) => openUserinfo.request('login', {userId: user.name, userPinCode : user.password}, options)
  }
};
