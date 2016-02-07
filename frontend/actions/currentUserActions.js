var AppDispatcher = require('./../dispatcher/dispatcher');
var UserConstants = require('./../constants/user_constants');

var CurrentUserActions = {

  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_CURRENT_USER,
      currentUser: currentUser
    });
  },

  receiveLogOut: function() {
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGGED_OUT_USER,
      data: {}
    });
  },

  badLogin: function(messages) {
    AppDispatcher.dispatch({
      actionType: UserConstants.BAD_LOGIN,
      data: messages
    });
  },

  badCreateUser: function(messages) {
    AppDispatcher.dispatch({
      actionType: UserConstants.BAD_CREATE_USER,
      data: messages
    });
  }

};

module.exports = CurrentUserActions;
