/**
 * preprocessor for jest tests.
 *
 * Converts jsx => js
 */
var ReactTools = require('react-tools');
BabelJest = require('babel-jest');
module.exports = {
  process: function(src, filename) {
    src = BabelJest.process(src, filename);
    return ReactTools.transform(src);
  }
};
