var React = require('react');
var CartStore = require('../stores/Cart.store');
var Actions = require('../actions/Actions');
var Reflux = require('reflux');
var _ = require('lodash');

var Cart = React.createClass({
  mixins: [Reflux.ListenerMixin],

  _updateState: function(_store) {
    var cart = _store.cart;
    var state = this.state;

    if(!_.isUndefined(cart[state.pid])){
      state.inCart = true;
      state.cartId = cart[state.pid].id;
    }

    this.setState(state);
  },

  getInitialState: function() {
    return this.props;
  },

  componentWillMount: function() {
    Actions.getCart();
  },

  componentDidMount: function() {
    this.listenTo(CartStore, this._updateState);
  },

  onClick: function() {
    var state = this.state;
    var inCart = state.inCart;
    state.inCart = !inCart;
    this.setState(state);

    if(inCart) {
      //TODO mmj remove from cart
      console.log(this.state);
    }
    else {
      Actions.addCartContent(this.state.pid);
    }
  },

  render: function() {
    var value = (this.state.inCart) ? 'Remove from cart' : 'Add to cart';
    return <input type='button' value={value} onClick={this.onClick}/>;
  }
});

module.exports = Cart;