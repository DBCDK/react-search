/**
 * @dbc configurations can be fetched from git.dbc.dk:
 *
 * git clone -b develop ssh://git.dbc.dk/repos/dbc_config
 *
 * Make a symlink from react-search.config.js to <root>/config.js
 *
 * ln -s /<path>/<to>/<config>/react-search.config.js config.js
 */

module.exports = {
 opensearch : {
  wsdl : /* url to wsdl */,
  agency : /* agency */,
  profile : /* profile */,
 },
 openholdingstatus : {
  wsdl : /* url to wsdl */,
 }
}
