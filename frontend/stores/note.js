var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var NoteStore = new Store(Dispatcher);

var _notes = {};
var _notesArr = [];

NoteStore.all = function() {
  //NOTE - changed this to return an array so the notes are in the order
  //that they were received in
  var allNotes = [];
  Object.keys(_notes).forEach(function(id){
    allNotes.push(_notes[id]);
  });

  return allNotes;
};

NoteStore.resetNotes = function(newNotes){
  //notesArr should have the notes in the order in which they were returned
  // debugger
  // _notesArr = newNotes.slice(0);
  _notes = {};
  for (var i = 0; i < newNotes.length; i++) {
    _notes[newNotes[i].id] = newNotes[i];
  }
};

NoteStore.addNote = function(note) {
  // _notesArr.push(note);
  _notes[note.id] = note;
};

NoteStore.updateNote = function(updatedNote) {
  _notes[updatedNote.id] = updatedNote;
};

NoteStore.find = function(noteId) {
  var id = parseInt(noteId);
  return Object.assign({}, _notes[id]);
};

// NoteStore.firstNote = function() {
//   // return _notesArr[0];
//   Object.keys(_notes).map(function(note, index){
//     if (index === 0) {
//       return note;
//     }
//   });
// };

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
   case "NOTE_CREATED":
      NoteStore.addNote(payload.data);
      NoteStore.__emitChange();
      break;
   case "NOTE_UPDATED":
      NoteStore.updateNote(payload.data);
      NoteStore.__emitChange();
      break;
  case "NOTE_DELETED":
     NoteStore.resetNotes(payload.data);
     NoteStore.__emitChange();
     break;
    default:

  }
};

//may need to copy the objects into an array

module.exports = NoteStore;
