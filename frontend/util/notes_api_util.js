var NoteActions = require('../actions/noteActions');

var NotesAPIUtil = {
  fetchAllNotes: function() {
    $.ajax({
      type: 'GET',
      url: '/api/notes',
      dataType: 'json',
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

  addNote: function(note, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/notes',
      dataType: 'json',
      data: note,
      success: function(data) {
        //udate NoteActions
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
        debugger
        NoteActions.deletedNote(data);
        callback && callback();
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
