var NoteActions = require('../actions/noteActions');
var CurrentUserActions = require('../actions/currentUserActions');

var NotesAPIUtil = {
  fetchAllNotes: function() {
    $.ajax({
      type: 'GET',
      url: '/api/notes',
      dataType: 'json',
      success: function(data) {
        // debugger
        NoteActions.receiveNotes(data);
      },
      error: function(data) {
        alert("Error in fetchAllNotes");
      }
    });
  },

  fetchSingleNote: function(id) {
    $.ajax({
      type: 'GET',
      url: '/api/notes/' + id,
      dataType: 'json',
      success: function(data) {
        NoteActions.receiveSingleNote(data);
      },
      error: function(data ) {
        alert("Error in fetchSingleNote");
      }
    });
  },

  fetchNotebookNotes: function(notebook) {
    $.ajax({
      type: 'GET',
      url: '/api/notebooks/' + notebook.id + "/notes",
      dataType: 'json',
      success: function(data) {
        NoteActions.receiveNotes(data);
      },
      error: function(data) {
        alert("Error in fetchNotebookNotes");
      }
    });
  },

  addNote: function(note, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/notes',
      dataType: 'json',
      data: note,
      success: function(data) {
        NoteActions.createNote(data);
        callback && callback();
      },
      error: function(data) {
        alert("Error in addNote");
      }
    })
  },

  deleteNote: function(note, callback) {
    $.ajax({
      type: 'DELETE',
      url: '/api/notes/' + note.id,
      dataType: 'json',
      data: note,
      success: function(data) {
        NoteActions.deletedNote(data);
        callback && callback(data);
      },
      error: function(data) {
        alert("Error in deleteNote");
      }
    });
  },

  updateNote: function(note) {
    // debugger
    $.ajax({
      type: 'PATCH',
      url: '/api/notes/' + note.id,
      dataType: 'json',
      data: note,
      success: function(data) {
        NoteActions.updatedNote(data);
        // CurrentUserActions.noteUpdated(data);
      },
      error: function(data) {
        alert("Error in updateNote");
      }
    });
  }

};

module.exports = NotesAPIUtil;
