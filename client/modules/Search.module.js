var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    Navigation = Router.Navigation,
    SearchStore = require('../stores/SearchStore'),
    Actions = require('../actions/Actions'),
    SearchField = require('../components/SearchField'),
    SearchResult = require('../components/SearchResult');

var SearchModule = React.createClass({
  mixins: [Reflux.ListenerMixin, Navigation],
  getInitialState: function() {
    return {search: this.getParams().path || null};
  },
   componentWillMount: function() {
   if (this.getParams().path) {
      SearchStore.search(this.getParams().path);
   }
 },
  _onSubmit : function (value) {
    this.transitionTo('search', {path: value});
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
