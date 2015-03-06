var React = require('react');

var HoldingStatus = React.createClass({

  render: function() {
    return (
      <span className={'house ' + this.props.status} >this.props.status</span>
    );
  }

});

module.exports = HoldingStatus;
