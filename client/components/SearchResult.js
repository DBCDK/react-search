var React = require('react/addons'),
    Work = require('./Work'),
    Loader = require('react-loader');


var SearchResult = React.createClass({
 render: function() {
  let cx = React.addons.classSet;
  let classes = cx({
   searchresult: true,
   pending: this.props.pending
  });
  let result = (this.props.result) && this.props.result.map((work, i) => {
    return (<Work key={i} element={work} />);
  });
  return (
   <div ref="SearchResult" className={classes}>
    <Loader loaded={!this.props.pending} />
    {result}

   </div>
  );
 }
 ,
});

module.exports = SearchResult;
