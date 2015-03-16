var transform = require('jsonpath-object-transform');

module.exports = function(result) {
    var template = {
        images: ['$.identifierInformation..coverImage.*', {
            url: '$..$value',
            size: '$..imageSize',
            format : '$..imageFormat'
        }],
    };
    var transformed = transform(result, template);
    return transformed;
}

