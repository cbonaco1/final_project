var CurrentUserActions = require("./../actions/currentUserActions");
var ErrorStore = require('./../stores/errors');

var SessionsApiUti = {
  login: function(credentials, callback){
    //AJAX request to create new session
    $.ajax({
      type: 'POST',
      url: 'api/session',
      data: credentials,
      dataType: 'json',
      success: function(data) {
        //need to clear error messages from component
        ErrorStore.clearMessages();
        CurrentUserActions.receiveCurrentUser(data);
        callback && callback();
      },
      error: function(data) {
        CurrentUserActions.badLogin(data);
      }
    });
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
