var NoteActions = require('../actions/noteActions');

var apiUtil = {
  fetchAllNotes: function() {
    $.ajax({
      type: 'GET',
      url: '/notes',
      dataType: 'json',
      success: function(data) {
        NoteActions.receiveNotes(data);
      },
      error: function(data) {
        alert("Error in fetchAllNotes");
      }
    });
  }
};

module.exports = apiUtil;
