/**
 * Config file for webpack
 */

var webpack = require('webpack');
var path = require('path');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

// Do not rebuild assets on error.
// This is not activated because it can be dificult to catch errors during
// development
var noErrors = new webpack.NoErrorsPlugin();

module.exports = {
  entry: {
    search: './client/entry/search.entry.js',
    login: './client/entry/login.entry.js'
  },
  devtool: "source-map",
  output: {
    path: __dirname + '/public',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    definePlugin,
    commonsPlugin
    //noErrors
  ]
};
