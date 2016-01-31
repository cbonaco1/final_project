var Dispatcher = require('../dispatcher/dispatcher');

var NotebookActions = {
  createNotebook: function(notebook){
    Dispatcher.dispatch({
      actionType: "NOTEBOOK_CREATED",
      data: notebook
    });
  }
};

module.exports = NotebookActions;
