var React = require('react/addons'),
    Work = require('./Work'),
    Loader = require('react-loader'),
    Message = require('./Message');

var SearchResult = React.createClass({
  _result: function (props) {
    if (!props.result) {
      return null;
    }
    if (props.result.length) {
      return props.result.map((work, i) => {
        return (<Work key={i} element={work} user={props.user} />);
      });
    }
    else {
      return (<Message type={Message.types.WARNING} message={'Øv ingen resultater på søgningen ' + props.query} />);
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
        {this._result(this.props)}
      </div>
      );
   }
 });

module.exports = SearchResult;
