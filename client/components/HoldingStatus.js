var React = require('react');

function parseHoldingsResponse(response) {
  if (response.responder) {
    return {
      home: Date.parse(Date().slice(0, 15)) <= Date.parse(response.responder.expectedDelivery),
      willLend: (response.responder.willLend === 'true'),
      expectedDelivery: (new Date(response.responder.expectedDelivery)).toLocaleDateString(),
    }
  } else {
      return {
        home: false,
        willLend: false,
        error : true,
        expectedDelivery: response.error.errorMessage,
    }
  }
}

var HoldingStatus = React.createClass({
  render: function() {
    var holdings = parseHoldingsResponse(this.props.element);
    var cx = React.addons.classSet;
    var classes = cx({
      'home': holdings.home,
      'willLend': holdings.willLend,
      'house': true,
      'error' : holdings.error
    });

    return (
      <span className = {classes}>{holdings.expectedDelivery}< /span>
    );
  }
});

module.exports = HoldingStatus;
