var React = require('react'),
    Holdings = require('./HoldingStatus'),
    Frontpage = require('./Frontpage.js');

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
     <div className="Work" id={element.id}>
      <h2>{element.title}</h2>
      <Frontpage pid={element.id} size="detail_207"/>
      <div className='element author'>{ (element.creator.length) ? 'af ' + _mapElement(element.creator[0]) : ''}</div>
      <div className='element abstract'>{ element.abstract }</div>
      <Holdings pid={element.id} />
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
