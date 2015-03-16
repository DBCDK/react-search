var React = require('react');
var FrontpageStore = require('../stores/FrontpageStore');
var Actions = require('../actions/Actions');
var Reflux = require('reflux');

function _getImage(images, size) {
  return images.filter((image) => image.size === size).pop();
}

var Frontpage = React.createClass({
  mixins : [Reflux.ListenerMixin],
  _updateState : function (frontpages) {
    if (frontpages[this.state.pid]) {
      var state = this.state;
      state.images = frontpages[this.state.pid].images || [];
      this.setState(state);
    }
  },
  getInitialState : function () {
    return {
      pid : this.props.pid,
      size : this.props.size,
      images : []
    }
  },
  componentWillMount : function () {
    Actions.frontpage(this.state.pid);
  },
  componentDidMount : function () {
    this.listenTo(FrontpageStore, this._updateState);
  },
  render: function() {
    var image = _getImage(this.state.images, this.state.size);
    return image && (
      <img src={image.url} />
    ) || (<span />);
  }
});

module.exports = Frontpage;
