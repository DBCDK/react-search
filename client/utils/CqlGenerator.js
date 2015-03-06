
/**
 * Converts a string to valid cql
 *
 * Tests in a string contains space. If so adds quotes
 * TODO: Handle quotes
 *
 * @param  {String} value inputstring from user
 * @return {String}       cql formatted string
 */
function stringToCql (value) {
 let processed = value;
 if (/ /.exec(value)){
  processed = '"' + value + '"';
 }
 return processed;
}


const AND = ' and ',
      OR = ' or ',
      NOT = ' not '

let CqlGenerator = function () {
 let _query = [];
 let lastInsertWasOperation = true;

 return {
  AND : AND,
  OR : OR,
  NOT: NOT,
  op : function (op) {
   _query.push(op);
   lastInsertWasOperation = true;
   return this;
  },
  query : function (q) {
   return this.cql(stringToCql(q));
  },
  cql : function (cql) {
   if (!lastInsertWasOperation) {
    this.op(AND);
   }
   _query.push(cql);
   lastInsertWasOperation = false;
   return this;
  },
  getQuery : function() {
    return _query.join('');
  }
 }
}

module.exports = CqlGenerator;
