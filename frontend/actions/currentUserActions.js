var AppDispatcher = require('./../dispatcher/dispatcher');

var CurrentUserActions = {

  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE_CURRENT_USER",
      currentUser: currentUser
    });
  },

  receiveLogOut: function() {
    AppDispatcher.dispatch({
      actionType: "LOGGED_OUT_USER",
      data: {}
    });
  },

  badLogin: function(messages) {
    AppDispatcher.dispatch({
      actionType: "BAD_LOGIN",
      data: messages
    });
  }

};

module.exports = CurrentUserActions;
