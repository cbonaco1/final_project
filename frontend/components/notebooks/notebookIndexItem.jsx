var React = require('react');
var NoteActions = require('./../../actions/noteActions');

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

  displayNote: function() {
    //are you sure you want to delete this notebook?
  },

  render: function() {
    //display title and number of notes
    //onClick of NotebookIndexItem, display Notes from that notebook
    return(
      <li className="notebook-index-item" onClick={this.displayNotebookNotes}>
        <div className="notebook-index-item-header group">
          <h3 className="notebook-index-title">{this.props.notebook.title}</h3>
          <i className="fa fa-lg fa-trash notebook-delete-icon" onClick={this.deleteNote}></i>
        </div>
        <p>{this.props.notebook.notes.length} notes</p>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
