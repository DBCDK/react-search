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
      state.pending = frontpages[this.state.pid].pending;
      this.setState(state);
    }
  },
  getInitialState : function () {
    return {
      pending : true,
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
    var img;
    if (this.state.pending) {
      img = (<img className='loader' src="/loader.gif" />)
    }
    else if (this.state.images.length) {
       var image = _getImage(this.state.images, this.state.size);
       img = (<img className="frontpage" src={image.url} />)
    }
    else {
     img = (<img className="no-image" src="/no-image.png" />)
    }

    return (
      <div className="frontpage">
        {img}
      </div>
      )
  }
});

module.exports = Frontpage;
