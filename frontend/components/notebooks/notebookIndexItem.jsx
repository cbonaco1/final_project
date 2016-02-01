var React = require('react');
var NoteActions = require('./../../actions/noteActions');

var NotebookIndexItem = React.createClass({

  displayNotebookNotes: function() {
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

  render: function() {
    //display title and number of notes
    //onClick of NotebookIndexItem, display Notes from that notebook
    return(
      <li className="notebook-index-item" onClick={this.displayNotebookNotes}>
        <h3>{this.props.notebook.title}</h3>
        <p>{this.props.notebook.notes.length} notes</p>
      </li>
    );
  }
});

module.exports = NotebookIndexItem;
