var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions/Actions'),
    UserStore = require('../stores/User.store'),
    Message = require('./Message'),
    KEYCODES = {
      ENTER_KEY_CODE : 13
    };

var Login = React.createClass({

  getInitialState: function() {
    return {
      username : '',
      password : ''
    }
  },

  render: function() {
    return (
      <div className='login-box'>
        <input className='login-username' type='text' name='username' ref='username' onChange={this._onChange} />
        <input className='login-password' type='password' name='password' onChange={this._onChange} onKeyDown={this._onKeyDown} />
        <input onClick={this._onClick} className='login-submit' value={this.props.buttonValue} type='submit' />
      </div>
    );
  },

  _login : function () {
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
    this._login();
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KEYCODES.ENTER_KEY_CODE) {
      this._login();
    }
  }
});

var Logout = React.createClass({

  render: function() {
    return (
      <div className='logout-box'>
        <input onClick={this._onClick} className='logout-submit' value={this.props.buttonValue} type='submit' />
      </div>
    );
  },

  _onClick: function() {
    Actions.logout();
  },

});

var LoginWrapper = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      user : UserStore.getState().user,
      message : UserStore.getState().error
    }
  },

  componentDidMount: function() {
    this.listenTo(UserStore, () => {
      this.setState(UserStore.getState());
    });
  },

  render : function() {
    console.log(this.state);
    var form, message;

    if (!this.state.user) {
      form = (<Login buttonValue='login' />);
    }
    else {
      form = (<Logout buttonValue='logout'/>);
    }
    if (this.state.error) {
      message = (<Message type='error' message={this.state.error} />)
    }
    return (
      <div>
        {form}
        {message}
      </div>
      );
  }
});

module.exports = LoginWrapper;
