var React = require('react');

var Message = React.createClass({
  render : function() {
    return (
      <div className={'message '+ this.props.type}>
        {this.props.message}
      </div>
    );
  },
});

Message.types = {
  WARNING : 'warning',
  ERROR : 'error',
  STATUS : 'status'
}

module.exports = Message;
