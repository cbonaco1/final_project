var Dispatcher = require('../dispatcher/dispatcher');
var NotebookConstants = require('./../constants/notebook_constants');

var NotebookActions = {
  createNotebook: function(notebook){
    Dispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_CREATED,
      data: notebook
    });
  },

  receiveNotebooks: function(notebooks) {
    Dispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOKS_RECEIVED,
      data: notebooks
    });
  }
};

module.exports = NotebookActions;
