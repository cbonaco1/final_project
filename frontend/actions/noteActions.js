var Dispatcher = require('../dispatcher/dispatcher');

var NoteActions = {
  receiveNotes: function(notes) {
    //let stores know something has changed
    Dispatcher.dispatch({
      actionType: "NOTES_RECEIVED",
      data: notes
    });
  },

  receiveSingleNote: function(note) {
    Dispatcher.dispatch({
      actionType: "NOTE_RECEIVED",
      data: note
    });
  },

  createNote: function(note) {
    Dispatcher.dispatch({
      actionType: "NOTE_CREATED",
      data: note
    })
  }
};

module.exports = NoteActions;
