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
        //UserActions.receiveNewUser(data)
      },
      error: function(data) {
        alert("Error in createUser");
      }
    });
  }
};

module.exports = UserApiAUtil;
