var socketIo = require('socket.io'),
    template = require('../lib/Search/Transformers/dkabm.js'),
    Search = require('../lib/Search/Search.js'),
    holdings = require('../lib/Holdingstatus/Holdingstatus.js');



module.exports = function (app) {
  socketIo(app).on('connection', (socket) => routes(socket));
}

function routes(socket) {
var search = Search(socket);
// Search
socket.on('search', function(data){
  console.log(data);
  //1. Search performed
  search.get(data.query)
  // 2. Search object is transformed
  .transform(template)
  // Emit result
  .emit('search')
  .then(holdings.get)
  .emit('search')
  //.add(basket, 'basket')
  //.catch()
  ;
});

}
