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
  }
};

module.exports = NoteActions;
