var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');

var NotificiationStore = new Store(AppDispatcher);

var _messages = [];

NotificiationStore.getMessages = function() {
  return _messages;
};

NotificiationStore.setMessages = function(messages) {
  _messages = messages.splice(0);
};

NotificiationStore.clearMessages = function() {
  _messages = [];
};

NotificiationStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "NOTE_UPDATED":
      NotificiationStore.setMessages(["Note updated!"]);
      NotificiationStore.__emitChange();
      break;
  }
};

module.exports = NotificiationStore;
