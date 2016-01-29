var AppDispatcher = require('./../dispatcher/dispatcher');

var CurrentUserActions = {
  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE_CURRENT_USER",
      currentUser: currentUser
    });
  }
};

module.exports = CurrentUserActions;
