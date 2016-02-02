var Dispatcher = require('../dispatcher/dispatcher');
var NoteConstants = require('./../constants/note_constants');

var NoteActions = {
  receiveNotes: function(notes) {
    //let stores know something has changed
    Dispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      data: notes
    });
  },

  receiveSingleNote: function(note) {
    Dispatcher.dispatch({
      actionType: NoteConstants.NOTE_RECEIVED,
      data: note
    });
  },

  createNote: function(note) {
    Dispatcher.dispatch({
      actionType: NoteConstants.NOTE_CREATED,
      data: note
    })
  },

  updatedNote: function(note) {
    Dispatcher.dispatch({
      actionType: NoteConstants.NOTE_UPDATED,
      data: note
    })
  },

  deletedNote: function(notes) {
    Dispatcher.dispatch({
      actionType: NoteConstants.NOTE_DELETED,
      data: notes
    })
  }
};

module.exports = NoteActions;
