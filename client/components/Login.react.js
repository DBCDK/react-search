var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions/Actions'),
    UserStore = require('../stores/User.store'),
    KEYCODES = {
      ENTER_KEY_CODE : 13,
    };

var SearchField = React.createClass({
mixins: [Reflux.ListenerMixin],
 getInitialState: function() {
    return {
      user : UserStore.getState().user,
      username : '',
      password : ''
    }
  },
  componentDidMount: function() {
    this.listenTo(UserStore, () => {
      this.setState(UserStore.getState());
    });
  },
  render: function() {
    console.log(this.state);
    return (
      <div className='searchfield'>
      <input
        className='login-username'
        type='text'
        name='username'
        ref='username'
        onChange={this._onChange}
      />
      <input
        className='login-password'
        type='password'
        name='password'
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
      <input onClick={this._onClick} className='login-submit' value={this.props.buttonValue} type='submit' />
      </div>
    );
  },
  login : function () {
    Actions.login({
      username : this.state.username,
      password : this.state.password
    });
  },
  _onChange : function (event) {
    var state = {}
    state[event.target.name] = event.target.value;
    this.setState(state);
  },
  _onClick: function() {
    this.login();
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KEYCODES.ENTER_KEY_CODE) {
      this.login();
    }
  }
});

module.exports = SearchField;
