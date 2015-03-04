var React = require('react'),
    SearchField = require('../components/SearchField'),
    SearchResult = require('../components/SearchResult');

var SearchModule = React.createClass({
  getInitialState: function() {
    return {search: ''};
  },
  _onSubmit : function (value) {

  },
  _onChange : function (event) {

  },
  render: function() {
    return (
      <div className='search'>
        <SearchField submit={this._onSubmit} change={this._onChange} button={true} buttonValue='Søg' />
        <SearchResult >
        </SearchResult>
    </div>
    );
  }
});

module.exports = SearchModule;
