var CurrentUserActions = require("./../actions/currentUserActions");

var SessionsApiUti = {
  login: function(credentials, callback){
    //AJAX request to create new session
    $.ajax({
      type: 'POST',
      url: 'api/session',
      data: credentials,
      dataType: 'json',
      success: function(data) {
        console.log("Logged in!: " + data.username);
        CurrentUserActions.receiveCurrentUser(data);
        callback && callback();
      },
      error: function(data) {
        alert("Error in login");
      }
    });
  },

  logout: function(callback) {
    $.ajax({
      type: 'DELETE',
      url: 'api/session',
      dataType: 'json',
      success: function(data) {
        console.log("Successful logout: " + data);
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
