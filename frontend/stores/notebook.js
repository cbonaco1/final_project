var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var NoteStore = new Store(Dispatcher);

var _notebooks = [];

NotebookStore.all = function() {
  return _notebooks;
};

NotebookStore.add = function(notebook) {
  _notebooks.push(notebook);
};

NoteStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "NOTEBOOK_CREATED":
      NotebookStore.add(payload.data);

      //Emit change will not do anything now since no components are
      //listening to it
      NotebookStore.__emitChange();
      break;
    default:

  }
};

module.exports = NotebookStore;
