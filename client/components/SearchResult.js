var React = require('react'),
    Work = require('./Work'),
    Loader = require('react-loader');


var SearchResult = React.createClass({
 render: function() {
  var result = (this.props.result) && this.props.result.map((work, i) => {
   console.log(i);
    return (<Work key={i} element={work} />);
  });
  return (
   <div ref="SearchResult" className='searchresult'>
    <Loader loaded={!this.props.pending} />
    {result}

   </div>
  );
 }
 ,
});

module.exports = SearchResult;
