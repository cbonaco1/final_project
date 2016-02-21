var CurrentUserActions = require("./../actions/currentUserActions");
var ErrorStore = require('./../stores/errors');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

var SessionsApiUti = {

  mixins: [History],

  login: function(credentials, callback){
    $.ajax({
      type: 'POST',
      url: 'api/session',
      data: credentials,
      dataType: 'json',
      success: function(data) {
        ErrorStore.clearMessages();
        CurrentUserActions.receiveCurrentUser(data);
        callback && callback();
      },
      error: function(data) {
        CurrentUserActions.badLogin(data);
      }
    });
  },

  loginAsGuest: function(callback) {
    this.login({username: "guest", password: "guestpassword"}, callback);
  },

  logout: function(callback) {
    $.ajax({
      type: 'DELETE',
      url: 'api/session',
      dataType: 'json',
      success: function(data) {
        CurrentUserActions.receiveLogOut();
        callback && callback();
      },
      error: function(data) {
        alert("Error in logout");
      }

    });
  },

  fetchCurrentUser: function(callback) {
    $.ajax({
      type: 'GET',
      url: 'api/session',
      dataType: 'json',
      success: function(data) {
        CurrentUserActions.receiveCurrentUser(data);
        callback && callback();
      },
      error: function(data) {
        alert("Error in fetchCurrentUser");
      }
    });
  }


};

module.exports = SessionsApiUti;
