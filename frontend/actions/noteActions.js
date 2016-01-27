var Dispatcher = require('../dispatcher/dispatcher');

var NoteActions = {
  receiveNotes: function(notes) {
    //let stores know something has changed
    Dispatcher.dispatch({
      actionType: "NOTES_RECEIVED",
      data: notes
    });
  }
};

module.exports = NoteActions;
