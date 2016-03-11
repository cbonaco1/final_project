var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var NotebookConstants = require('./../constants/notebook_constants');

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

  // return allNotes;
  return _notesArr;
};

NoteStore.resetNotes = function(newNotes){
  //notesArr has the notes in the order in which they were returned
  _notesArr = newNotes.slice(0);
  _notes = {};
  for (var i = 0; i < newNotes.length; i++) {
    _notes[newNotes[i].id] = newNotes[i];
  }
};

NoteStore.filterNotes = function(notebooks){
  //Reset _notes to be just the notes from the notebooks in notebooks array arg
  _notes = {};
  notebooks.forEach(function(notebook){
    notebook.notes.forEach(function(note){
      NoteStore.addNote(note);
    })
  });
};

NoteStore.addNote = function(note) {
  _notesArr.unshift(note);
  _notes[note.id] = note;
};

NoteStore.updateNote = function(updatedNote) {
  //to update the _notesArr array, need to iterate through to find it

  _notes[updatedNote.id] = updatedNote;
};

NoteStore.find = function(noteId) {
  var id = parseInt(noteId);

  //copies values from _notes[id] into an empty object
  return Object.assign({}, _notes[id]);
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
  case NotebookConstants.NOTEBOOK_DELETED:
     NoteStore.filterNotes(payload.data);
     NoteStore.__emitChange();
     break;
    default:

  }
};

//may need to copy the objects into an array

module.exports = NoteStore;
