var React = require('react'),
    KEYCODES = {
      ENTER_KEY_CODE : 13,
      KEY_DOWN : 40,
      KEY_UP : 38
    };

var SearchField = React.createClass({

 getInitialState: function() {
    return {text: (this.props.initialValue) ? this.props.initialValue : ''};
  },
  render: function() {
    let button = (this.props.button) ? (<input onClick={this._onClick} className='searchfield-button' value={this.props.buttonValue} type='button' />) : '';
    return (
      <div className='searchfield'>
      <input
        className='searchfield-input'
        type='text'
        name='search'
        ref='searchinput'
        value={this.state.text}
        onKeyDown={this._onKeyDown}
        onChange={this._onChange}
      />
      {button}
      </div>
    );
  },
  _onChange: function(event, value) {
    this.setState({text: event.target.value});
    this.props.change && this.props.change(event.target.value)
  },
  _onClick: function() {
    this.props.submit && this.props.submit(this.state.text);
  },

  _onKeyDown: function(event) {
    if (event.keyCode === KEYCODES.ENTER_KEY_CODE) {
      this.props.submit && this.props.submit(this.state.text);
    }
  }
});

module.exports = SearchField;
