var CurrentUserActions = require("./../actions/currentUserActions");
var ErrorStore = require('./../stores/errors');

var UserApiAUtil = {
  createUser: function(credentials, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/users',
      data: credentials,
      dataType: 'json',
      success: function(data) {
        ErrorStore.clearMessages();
        callback && callback(data);
        //Dont think I need this since no component needs to be updated/re-rendered
        // with new user info when a new user is added
        //UserActions.receiveNewUser(data)
      },
      error: function(data) {
        CurrentUserActions.badCreateUser(data);
      }
    });
  }
};

module.exports = UserApiAUtil;
