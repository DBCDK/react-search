/**
 * preprocessor for jest tests.
 *
 * Converts jsx => js
 */
var ReactTools = require('react-tools');
module.exports = {
  process: function(src) {
    return ReactTools.transform(src);
  }
};
