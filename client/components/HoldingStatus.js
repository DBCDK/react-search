var React = require('react');
var HoldingStore = require('../stores/HoldingStore');
var Actions = require('../actions/Actions');
var Reflux = require('reflux');


var HoldingStatus = React.createClass({
  mixins : [Reflux.ListenerMixin],
  _updateState : function (holdings) {
    if (holdings[this.state.pid]) {
      var state = this.state;
      state.element = holdings[this.state.pid].holding;
      this.setState(state);
    }
  },
  getInitialState : function () {
    return this.props;
  },
  componentWillMount : function () {
    Actions.holdings(this.state.pid);
  },
  componentDidMount : function () {
    this.listenTo(HoldingStore, this._updateState);
  },
  render: function() {
    var holdings = this.state.element || {};
    var cx = React.addons.classSet;
    var classes = cx({
      'home': holdings.home || false,
      'willLend': holdings.willLend || false,
      'house': true,
      'error' : holdings.error || false
    });

    return (
      <span className = {classes}>{holdings.expectedDelivery || holdings.errorMessage}</span>
    );
  }
});

module.exports = HoldingStatus;
