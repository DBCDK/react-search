var _ = require('lodash'),
    React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    SearchStore = require('../stores/SearchStore'),
    UserStore = require('../stores/User.store'),
    Actions = require('../actions/Actions'),
    CqlGenerator = require('../utils/CqlGenerator'),
    SearchField = require('../components/SearchField'),
    SearchResult = require('../components/SearchResult');

/**
 * Main search module
 *
 * Contains searchfield and searchresult
 * and is the main controller of data
 *
 * The components used in this component, should be dump components, only
 * reacting to the propeties comming from the state of this component
 *
 * state object contains
 * {
 *   query: Current query being send to OpenSearch,
 *   pending: is a searchresult being loaded,
 *   result: search Result object
 * }
 */

function _search(value) {
   let cql = CqlGenerator();
   let query = cql.query(value).getQuery();
   Actions.search(query);
}

var SearchModule = React.createClass({
  mixins: [Reflux.ListenerMixin, Router.Navigation, Router.State],
  propTypes: {
  },
  getDefaultProps: function() {
    return {};
  },
  getInitialState: function() {
    let state = {
      query: this.getParams().path || null,
      user : UserStore.getState().user
    };
    return _.extend(SearchStore.getState(), state);
  },
  componentWillMount: function() {
   if (this.getParams().path) {
    _search(this.getParams().path);
   }
  },
  componentDidMount: function() {
    this.listenTo(SearchStore, () => {
      this.setState(SearchStore.getState());
    });
    this.listenTo(UserStore, (store) => {
      this.setState({user : store.user});
    });
  },
  _onSubmit : function (value) {
    this.transitionTo('search', {path: value});
    _search(value);
  },

  _onChange : function (event) {
    //this could be used to implement an autocomplete
  },
  render: function () {
    return (
      <div className='search'>
      <SearchField
        initialValue={this.state.query}
        submit={this._onSubmit}
        change={this._onChange}
        button={true}
        buttonValue='Søg'
      />
      <SearchResult
        user={this.state.user}
        query={this.state.query}
        result={this.state.result}
        pending={this.state.pending}
      />
      </div>
      );
  }
});

  module.exports = SearchModule;
