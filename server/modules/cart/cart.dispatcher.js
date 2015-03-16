var OpenUserInfo = require('./client/OpenUserinfo.client');

module.exports = function(dispatcher){
  dispatcher.listen('cartRequest', (data, connection) => {
    console.log('cartRequest');
    OpenUserInfo.cart(data)
    //.then(result => connection.emit('cartResult', result))
  });
};