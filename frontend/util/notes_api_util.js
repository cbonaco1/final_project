var NoteActions = require('../actions/noteActions');
var CurrentUserActions = require('../actions/currentUserActions');

var NotesAPIUtil = {
  //set default order to be updated_at => desc (most recently updated on top)
  fetchAllNotes: function(order={"note_order":{"updated_at":"desc"}}) {
    $.ajax({
      type: 'GET',
      url: '/api/notes',
      dataType: 'json',
      data: order,
      success: function(data) {
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
    $.ajax({
      type: 'PATCH',
      url: '/api/notes/' + note.id,
      dataType: 'json',
      data: note,
      success: function(data) {
        NoteActions.updatedNote(data);
      },
      error: function(data) {
        alert("Error in updateNote");
      }
    });
  }

};

module.exports = NotesAPIUtil;
