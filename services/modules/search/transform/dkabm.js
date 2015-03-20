var transform = require('jsonpath-object-transform');

module.exports = function(result) {
  var template = {
    collections: ['$..collection.object', {
      id: '$..identifier',
      title: '$..record..title..$value',
      type: ['$..record.type', {
        value: '$..$value',
        type: '$..xsi:type'
      }],
      subjects: ['$..record.subject.*', {
        value: '$..$value',
        type: '$..xsi:type'
      }],
      abstract: '$..record.abstract',
      audience: ['$..record.audience..$value'],
      publisher: ['$..record.publisher'],
      contributor: ['$..record.contributor..$value'],
      creator: ['$..record.creator..$value'],
      date: '$..record.date',
      format: '$..record.format',
      language: '$..record.language..$value'
    }]
  };

  return transform(result, template);
};
