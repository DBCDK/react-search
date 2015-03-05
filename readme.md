# React search

Prototype of a Opensearch search widget implemented with [React](http://facebook.github.io/react/)

This document also provides some links to documentation of the different tools used in the project. The structure of this document has not landed yet, so expect a lot of rewriting.

### Installation
After cloning run `npm install`

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
All commits/pull requests should include tests of added functionality using Jest
[See documentation for jest](https://facebook.github.io/jest/)
For information on how to test React components [see information about test-utils add-on](http://facebook.github.io/react/docs/test-utils.html)

## Setup

## Configuration
Setup a configuration file with urls for Opensearch
The configuration script can only be used within the DBC A/S

### CSS
Written in sass and compiled using Webpack [sass-loader](https://www.npmjs.com/package/sass-loader) (This has not been tested yet)

### Webpack
Module bundling is done using webpack
[See documentation for webpack](http://webpack.github.io/docs/)

TODO: run `npm run hot` to start webpack server for [Hot module replacement](http://webpack.github.io/docs/hot-module-replacement.html)

### Usage
1. run `node index.js`
2. Fire up your favorite browser port "4001" and enter a search frase

## Tool documentation
Check theese links out, might be worth pursuiting
*Server side rendering*
* [Server side rendering from yahoo](https://github.com/yahoo/dispatchr)
* [Alternative](https://gist.github.com/koistya/24715d295fbf710d1e24)

## TODO
- Searchfield
- Searchresult view
- image in search result
- Holding status
- Login
- add to Favorites

## Coding principles and libraries
**Reactive functional Programming**
* [RxJS](https://github.com/Reactive-Extensions/RxJS)

**Imutability**
[immutable-js](https://github.com/facebook/immutable-js)

**Flux variations**
* We use -> [Reflux](https://github.com/spoike/refluxjs)
* [Fluxible from yahoo](https://github.com/yahoo/fluxible)
