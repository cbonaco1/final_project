var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');

var _currentUser = {};
var _currentUserHasBeenFetched = false;
var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function() {
  return $.extend({}, _currentUser);
},

CurrentUserStore.isLoggedIn = function() {
  //ensuring the current user has been set
  return !!_currentUser.id;
},

CurrentUserStore.__onDispatch = function(payload) {
  if (payload.actionType === "RECEIVE_CURRENT_USER") {
    _currentUserHasBeenFetched = true;
    _currentUser = payload.currentUser;
    CurrentUserStore.__emitChange();
  }
  else if (payload.actionType === "LOGGED_OUT_USER") {
    _currentUserHasBeenFetched = false;
    _currentUser = {};
    CurrentUserStore.__emitChange();
  }
};

CurrentUserStore.currentUserFetched = function () {
  return _currentUserHasBeenFetched;
}

module.exports = CurrentUserStore;
