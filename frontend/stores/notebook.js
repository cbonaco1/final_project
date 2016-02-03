var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var NotebookConstants = require('./../constants/notebook_constants');

var NotebookStore = new Store(Dispatcher);

var _notebooks = [];

NotebookStore.all = function() {
  return _notebooks;
};

NotebookStore.resetNotebooks = function(newNotebooks) {
  _notebooks = newNotebooks.slice(0);
};

NotebookStore.add = function(notebook) {
  _notebooks.push(notebook);
};

NotebookStore.find = function(notebookId){
  var id = parseInt(notebookId);
  return Object.assign({}, _notebooks[id]);
};

NotebookStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NotebookConstants.NOTEBOOK_CREATED:
      NotebookStore.add(payload.data);
      //Emit change will not do anything now since no components are
      //listening to it
      NotebookStore.__emitChange();
      break;
    case NotebookConstants.NOTEBOOKS_RECEIVED:
      NotebookStore.resetNotebooks(payload.data);
      NotebookStore.__emitChange();
      break;
    case NotebookConstants.NOTEBOOK_DELETED:
        NotebookStore.resetNotebooks(payload.data);
        NotebookStore.__emitChange();
        break;
    default:

  }
};

module.exports = NotebookStore;
