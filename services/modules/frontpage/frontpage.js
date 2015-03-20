var transform = require('./transform/transformImages.js');
var moreinfo = require('../../lib/clients/moreinfo.client');

module.exports.getImages = function(data, user) {
  return moreinfo.info(data.pid)
    .then((result) => {
      return {
        pid: data.pid,
        images: transform(result).images
      }
    })
}
