var NoteActions = require('../actions/noteActions');

var apiUtil = {
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
      url: 'api/notes/' + id,
      dataType: 'json',
      success: function(data) {
        NoteActions.receiveSingleNote(data);
      },
      error: function(data ) {
        alert("Error in fetchSingleNote");
      }
    });
  }
};

module.exports = apiUtil;
