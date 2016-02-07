var React = require('react');
var NoteActions = require('./../../actions/noteActions');
var NotebookApiUtil = require('./../../util/notebooks_api_util');
var NoteApiUtil = require('./../../util/notes_api_util');
var History = require('react-router').History;

var NotebookIndexItem = React.createClass({
  mixins: [History],

  displayNotebookNotes: function() {
    this.props.callback();
    //Items in this.props.notebook.notes do not contain Notebook references
    //(theyre just notes). Adding the Notebook reference here so we
    //can print the Notebook information in the header of NoteDetail
    this.props.notebook.notes.forEach(function(note) {
      note["notebook"] = this.props.notebook;
    }.bind(this));

    //Redirect the link to the first of the notes for the selected notebook
    //TODO might have to change how the notes are filtered by notebook
    //Objects in notebook.notes contain notebooks, which contain notes, etc.
    var notebookNotes = this.props.notebook.notes;
    if (notebookNotes.length > 0) {
      this.history.pushState(null, "/notes/" + notebookNotes[0].id);
    }
    else {
      this.history.pushState(null, "/notes");
    }

    NoteApiUtil.fetchNotebookNotes(this.props.notebook);

    //Update the NoteStore so the NoteIndex changes to have only the
    //notes from the selected Notebook

    //GET to notebooks/id/notes
    // debugger
    //Note
    // NoteActions.receiveNotes(notebookNotes);
  },

  deleteNotebook: function(e) {
    //stop the click event on the parent li, which displays the notes
    //for the selected notebook
    e.stopPropagation();
    var del = window.confirm("Are you sure you want to delete this Notebook?\n" +
                    "Note this will delete all Notes under this Notebook");
    if (del) {
      NotebookApiUtil.deleteNotebook(this.props.notebook, function(remainingNotebooks){
        //NOTE last notebook might not have any notes
        //TODO dont let user delete their last notebook
        var noteToRedirectTo = remainingNotebooks[0].notes[0].id;
        // debugger
        this.history.pushState(null, "/notes/" + noteToRedirectTo);
      }.bind(this));
    }
  },

  render: function() {
    //display title and number of notes
    //TODO onClick of NotebookIndexItem, display Notes from that notebook
    return(
      <li className="notebook-index-item" onClick={this.displayNotebookNotes}>
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
