var React = require('react');
var CartStore = require('../stores/Cart.store');
var Actions = require('../actions/Actions');
var Reflux = require('reflux');

var Cart = React.createClass({
  mixins : [Reflux.ListenerMixin],

  _updateState: function(_store){
    var cartContent = _store.cart;
    var state = this.state;
    state.inCart = (cartContent.indexOf(state.pid) != -1);
    this.setState(state);
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
    var state = this.state;
    state.inCart = !state.inCart;
    this.setState(state);
  },

  render: function() {
    var value = (this.state.inCart) ? 'Remove from cart' : 'Add to cart';
    return <input type='button' value={value} onClick={this.onClick}/>;
  }
});

module.exports = Cart;