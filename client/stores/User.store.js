var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var request = require('superagent')

var _store = {
  user: window._user || false,
};

var UserStore = Reflux.createStore({
  getState: function(){
    return _store;
  },

  login: function(data){
    var self = this;
    request
    .post('/login')
    .send(data)
    .end(function (response) {
      if (response.body && response.body.userId) {
        _store = {
          user : true,
          error : null
        };
      }
      else {
        _store = {
          user : false,
          error : 'Brugernavn eller password ugyldigt'
        }
      }
      self.trigger(_store);
    });
  },

  logout: function(){
  },

  init: function(){
    this.listenTo(Actions.login, this.login);
    this.listenTo(Actions.logout, this.logout);
  }
});

module.exports = UserStore;
