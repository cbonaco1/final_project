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
  }
};

module.exports = NotebookApiUtils;
