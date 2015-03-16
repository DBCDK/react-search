var React = require('react');
var FrontpageStore = require('../stores/FrontpageStore');
var Actions = require('../actions/Actions');
var Reflux = require('reflux');


var Frontpage = React.createClass({
  mixins : [Reflux.ListenerMixin],
  _updateState : function (frontpages) {
    if (frontpages[this.state.pid]) {
      var state = this.state;
      state.images = frontpages[this.state.pid].images;
      this.setState(state);
    }
  },
  getInitialState : function () {
    return this.props;
  },
  componentWillMount : function () {
    Actions.frontpage(this.state.pid);
  },
  componentDidMount : function () {
    this.listenTo(FrontpageStore, this._updateState);
  },
  render: function() {
    return this.state.images && (
      <img src={this.state.images.small} />
    ) || (<span />);
  }
});

module.exports = Frontpage;
