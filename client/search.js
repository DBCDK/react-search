var React = require('react'),
    SearchModule = require('./modules/Search.module');

// export for http://fb.me/react-devtools
window.React = React;

// Render module to dom
React.render(React.createElement(SearchModule),  document.getElementById('search-module'));
