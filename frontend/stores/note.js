var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var NoteStore = new Store(Dispatcher);

var _notes = [];

NoteStore.all = function() {
  return _notes.slice(0);
};
NoteStore.resetNotes = function(newNotes){
  _notes = newNotes;
};

NoteStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "NOTES_RECEIVED":
      NoteStore.resetNotes(payload.data);
      NoteStore.__emitChange();
      break;
    default:

  }
};

//may need to copy the objects into an array

module.exports = NoteStore;
