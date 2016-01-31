var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');

var ErrorStore = new Store(AppDispatcher);

var _errorMessages = [];

ErrorStore.getMessages = function() {
  return _errorMessages;
};

ErrorStore.setMessages = function(messages) {
  _errorMessages = messages.responseJSON;
};

ErrorStore.clearMessages = function() {
  _errorMessages = [];
};

ErrorStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "BAD_LOGIN":
    case "BAD_CREATE_USER":
      ErrorStore.setMessages(payload.data);
      ErrorStore.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
