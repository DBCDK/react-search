# React search

Prototype of a Opensearch search widget implemented with [React](http://facebook.github.io/react/)

This document also provides some links to documentation of the different tools used in the project. The structure of this document has not landed yet, so expect a lot of rewriting.

### Installation
After cloning run `npm install`

To run the build scripts install the following packages gobally
* webpack
* node-sass
* parallelshell
* supervisor

`npm install -g webpack node-sass parallelshell supervisor`

### Build
run `npm run build`
Preprocesses js and sass

### Run in dev mode
run `npm run dev`
This command will start a webpack watcher and a node server in watchmode

### Run in production
*This has not been tested yet*

1. Set NODE_ENV=production
2. run build script
3. start node server using (supervisor?/nodemon?)

### Tests
run `npm test` to run all tests

To run a single test jest-cli needs to be installed globally `npm install jest-cli -g`
the run `jest [filename]`. Path to file does not need to be included.

All commits/pull requests should include tests of added functionality using Jest
[See documentation for jest](https://facebook.github.io/jest/)
For information on how to test React components [see information about test-utils add-on](http://facebook.github.io/react/docs/test-utils.html)

## Setup

## Configuration
Setup a configuration file with urls for Opensearch
The configuration script can only be used within the DBC A/S

### CSS
Written in sass and compiled using Webpack [sass-loader](https://www.npmjs.com/package/sass-loader) (This has not been tested yet)

run `npm run css:watch` to build css on the fly with source maps

### SVG files
Use svg-sprite to handle svg files. Should be installed globally to run commandline commando

`svg-sprite --css --css-render-css --css-example --dest=dist app/static/images/*.svg -s`

### Webpack
Module bundling is done using webpack
[See documentation for webpack](http://webpack.github.io/docs/)

TODO: run `npm run hot` to start webpack server for [Hot module replacement](http://webpack.github.io/docs/hot-module-replacement.html)

### Usage
1. run `node index.js`
2. Fire up your favorite browser port "3000" and enter a search frase

## Tool documentation
Check theese links out, might be worth pursuiting
**Server side rendering**
* [Server side rendering from yahoo](https://github.com/yahoo/dispatchr)
* [Alternative](https://gist.github.com/koistya/24715d295fbf710d1e24)
* [React router serverside rendering](http://andreypopp.viewdocs.io/react-router-component/server-side)

**Routing**
* [React Router](https://github.com/rackt/react-router)
* _This could be interesting_ => [React Router Component](http://andreypopp.viewdocs.io/react-router-component)

**Sockets**
* [engine.io] (https://github.com/Automattic/engine.io) as a lightweight socket solution (The transportation layer for socket.io)

## TODO
- Searchfield
- Searchresult view
- image in search result
- Holding status
- Login
- add to Favorites

## Coding principles and libraries
**ES6**
* This project uses [babel](http://babeljs.io/) to convert es6 to es5

**Reactive functional Programming**
* [RxJS](https://github.com/Reactive-Extensions/RxJS)

**Imutability**
[immutable-js](https://github.com/facebook/immutable-js)

**Flux variations**
* We use -> [Reflux](https://github.com/spoike/refluxjs)
* [Fluxible from yahoo](https://github.com/yahoo/fluxible)
