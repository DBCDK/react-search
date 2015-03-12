var React = require('react/addons'),
    Work = require('./Work'),
    Loader = require('react-loader'),
    Message = require('./Message');

var SearchResult = React.createClass({
  _result: function (result, query) {
    if (!result) {
      return null;
    }
    if (result.length) {
      return result.map((work, i) => {
        let holdings = {status : 'home', text : 'tilgængelig på biblioteket'}
        return (<Work key={i} element={work} />);
      });
    }
    else {
      return (<Message type={Message.types.WARNING} message={'Øv ingen resultater på søgningen ' + query} />);
    }
  },
  render: function() {
    let classes, result;

    classes = React.addons.classSet({
      searchresult: true,
      pending: this.props.pending
    });
     return (
      <div ref="SearchResult" className={classes}>
      <Loader loaded={!this.props.pending} />
        {this._result(this.props.result, this.props.query)}
      </div>
      );
   }
   ,
 });

module.exports = SearchResult;
