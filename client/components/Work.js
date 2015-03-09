var React = require('react'),
    Holdings = require('./HoldingStatus');

function _mapElement(element) {
  if (Array.isArray(element)) {
   element = element.join(', ');
  }
  return element;
}
var Work = React.createClass({
  render : function() {
    var element = this.props.element;
    var holdings = this.props.holdings && (<Holdings status={this.props.holdings.status} text={this.props.holdings.text}/>);
    return (
     <div className="Work">
      <h2>{element.title}</h2>
      <img src='http://lorempixel.com/400/200/' />
      <div className='element'>{ (element.creator) ? 'af ' + _mapElement(element.creator) : ''}</div>
      {holdings}
     </div>
    );
  }
});

var WorkElement = React.createClass({
 render: function() {
  return (
   <div className="workelement">
    <span className='label'>{this.props.label}</span>
    <span className='value'>{this.props.value}</span>
   </div>
  );
 }
});

module.exports = Work;
