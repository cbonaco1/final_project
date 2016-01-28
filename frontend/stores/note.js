var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var NoteStore = new Store(Dispatcher);

var _notes = {};

NoteStore.all = function() {
  var allNotes = [];
  Object.keys(_notes).forEach(function(id){
    allNotes.push(_notes[id]);
  });

  return allNotes;
};

NoteStore.resetNotes = function(newNotes){
  _notes = {};
  for (var i = 0; i < newNotes.length; i++) {
    _notes[newNotes[i].id] = newNotes[i];
  }

};

NoteStore.find = function(noteId) {
  var id = parseInt(noteId);
  //this is coming back nothing - note is not in store
  return _notes[id];
};

NoteStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "NOTES_RECEIVED":
    // TODO: make constants
      NoteStore.resetNotes(payload.data);
      NoteStore.__emitChange();
      break;
   case "NOTE_RECEIVED":
      NoteStore.__emitChange();
      break;
    default:

  }
};

//may need to copy the objects into an array

module.exports = NoteStore;
