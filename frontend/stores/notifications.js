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
  return _messages;
};

NotificiationStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "NOTE_UPDATED":
      NotificiationStore.setMessages(["Note updated!"]);
      NotificiationStore.__emitChange();
      break;
    case "NOTE_CREATED":
      NotificiationStore.setMessages(["Note added!"]);
      NotificiationStore.__emitChange();
      break;
    case "NOTE_DELETED":
      NotificiationStore.setMessages(["Note deleted!"]);
      NotificiationStore.__emitChange();
      break;
    case "NOTEBOOK_CREATED":
      NotificiationStore.setMessages(["Notebook created!"]);
      NotificiationStore.__emitChange();
      break;
    case "NOTEBOOK_DELETED":
      NotificiationStore.setMessages(["Notebook deleted!"]);
      NotificiationStore.__emitChange();
      break;
  }
};

module.exports = NotificiationStore;
