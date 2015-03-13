var React = require('react');

var HoldingStatus = React.createClass({
  render: function() {
    var holdings = this.props.element || {};
    var cx = React.addons.classSet;
    var classes = cx({
      'home': holdings.home || false,
      'willLend': holdings.willLend || false,
      'house': true,
      'error' : holdings.error || false
    });

    return (
      <span className = {classes}>{holdings.expectedDelivery || holdings.errorMessage}< /span>
    );
  }
});

module.exports = HoldingStatus;
