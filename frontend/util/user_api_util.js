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
        callback && callback(data);
        //Dont think I need this since no component needs to be updated/re-rendered
        //UserActions.receiveNewUser(data)
      },
      error: function(data) {
        alert("Error in createUser");
      }
    });
  }
};

module.exports = UserApiAUtil;
