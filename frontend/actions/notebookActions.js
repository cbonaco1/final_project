var Dispatcher = require('../dispatcher/dispatcher');
var NotebookConstants = require('./../constants/notebook_constants');

var NotebookActions = {
  createNotebook: function(notebook){
    Dispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_CREATED,
      data: notebook
    });
  }
};

module.exports = NotebookActions;
