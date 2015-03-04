/**
 * Config file for webpack
 */

var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var noErrors = new webpack.NoErrorsPlugin();

module.exports = {
    entry: {
    search:  './client/search.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  module: {
      loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        definePlugin,
        commonsPlugin,
        noErrors
    ]
};
