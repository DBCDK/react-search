var React = require('react');

var SearchResult = React.createClass({
 render: function() {
  var result = (this.props.result) && this.props.result.map(function(work) {
    return (<Work element={work} />);
  });
  return (
   <div ref="SearchResult" className='searchresult'>
    {result}
   </div>
  );
 }
 ,
});

module.exports = SearchResult;
