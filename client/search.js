var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,

    SearchModule = require('./modules/Search.module');

// export for http://fb.me/react-devtools
window.React = React;

var routes = (
  <Route handler={SearchModule} path="/search/" />
    <Route handler={SearchModule} name="search" path=":path" />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('search-module'));
});
