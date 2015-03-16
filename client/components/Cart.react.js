var React = require('react');
var CartStore = require('../stores/Cart.store');
var Actions = require('../actions/Actions');
var Reflux = require('reflux');

var Cart = React.createClass({
  mixins : [Reflux.ListenerMixin],

  _updateState: function(cart){
  },

  getInitialState: function() {
    return this.props;
  },

  componentWillMount: function() {
    Actions.cart(this.state.pid);
  },

  componentDidMount: function() {
    this.listenTo(CartStore, this._updateState);
  },

  onClick: function(){
    console.log(this.state);
  },

  render: function() {
    return <input type='button' value='Add to cart' onClick={this.onClick}/>;
  }
});

module.exports = Cart;