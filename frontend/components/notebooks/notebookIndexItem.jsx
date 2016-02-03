var React = require('react');
var NoteActions = require('./../../actions/noteActions');
var NotebookApiUtil = require('./../../util/notebooks_api_util');

var NotebookIndexItem = React.createClass({

  displayNotebookNotes: function() {
    this.props.callback();
    //Items in this.props.notebook.notes do not contain Notebook references
    //(theyre just notes). Adding the Notebook reference here so we
    //can print the Notebook information in the header of NoteDetail
    this.props.notebook.notes.forEach(function(note) {
      note["notebook"] = this.props.notebook;
    }.bind(this));

    //Update the NoteStore so the NoteIndex changes to have only the
    //notes from the selected Notebook
    NoteActions.receiveNotes(this.props.notebook.notes);
  },

  deleteNotebook: function(e) {
    //e.preventDefault ?? to stop the li click event
    //are you sure you want to delete this notebook?
    //warn user this will delete all notes in that notebook
    NotebookApiUtil.deleteNotebook(this.props.notebook);
  },

  render: function() {
    //display title and number of notes
    //TODO onClick of NotebookIndexItem, display Notes from that notebook
    return(
      <li className="notebook-index-item">
        <div className="notebook-index-item-header group">
          <h3 className="notebook-index-title">{this.props.notebook.title}</h3>
          <i className="fa fa-lg fa-trash notebook-delete-icon" onClick={this.deleteNotebook}></i>
        </div>
        <p>{this.props.notebook.notes.length} notes</p>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
