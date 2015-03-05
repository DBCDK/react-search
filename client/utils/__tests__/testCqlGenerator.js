describe('CqlGenerator', function() {
 var CqlGenerator = require('../CqlGenerator');
 it('converts string to cql', function ()
 {
   let cql = CqlGenerator();
   // Single word is not transformed
   let result = cql.query('word').getQuery();
   expect(result).toEqual('word');

   // Phrase has qoutes added is not transformed
   cql = CqlGenerator();
   result = cql.query('more word').getQuery();
   expect(result).toEqual('"more word"');

   // Multible inserts
   cql = CqlGenerator();
   result = cql.query('word')
    .op(cql.OR)
    .query('more words')
    .cql('term.type="hest og test"')
    .getQuery();
   expect(result).toEqual('word or "more words" and term.type="hest og test"');
 });
});
