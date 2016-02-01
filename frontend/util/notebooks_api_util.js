var NotebookActions = require('./../actions/notebookActions');

var NotebookApiUtils = {
  createNotebook: function(notebook, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/notebooks',
      data: notebook,
      dataType: 'json',
      success: function(data) {
        // debugger
        NotebookActions.createNotebook(data);
        callback && callback(data);
      },
      error: function(data) {
        alert("Error in createNotebook");
      }
    });
  },

  fetchCurrentUserNotebooks: function(callback) {
    $.ajax({
      type: 'GET',
      url: '/api/notebooks',
      dataType: 'json',
      success: function(data) {
        //Controller gets the current_user notebooks
        NotebookActions.receiveNotebooks(data);
        callback && callback(data);
      },
      error: function(data) {
        alert("Error in fetchUserNotebooks");
      }
    });
  }
};

module.exports = NotebookApiUtils;
