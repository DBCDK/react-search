var transform = require('./transform/transformImages.js');
var moreinfo = require('./client/moreinfo.client');
var _dispatcher;

module.exports = function(dispatcher) {
    dispatcher.listen('frontpageRequest', (data, connection) => {
        moreinfo.info(data.pid)
            .then((result) => {
                return {
                    pid: data.pid,
                    images: transform(result).images
                }
            })
            .then((result) => connection.emit('frontpageResult', result));
    });
}
