var React = require('react');

function _mapElement(element) {
  if (Array.isArray(element)) {
   element = element.join(', ');
  }
  return element;
}
var Work = React.createClass({
  render : function() {
    var element = this.props.element;
    return (
     <div className="Work">
      <h2>{element.title}</h2>
      <img src='http://lorempixel.com/400/200/' />
      <div className='element'>{ (element.contributor) ? 'af ' + _mapElement(element.contributor) : ''}</div>
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
