var React = require('react');
var NoteActions = require('./../../actions/noteActions');
var NotebookApiUtil = require('./../../util/notebooks_api_util');
var NoteApiUtil = require('./../../util/notes_api_util');
var DeletePrompt = require('./../deletePrompt');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var History = require('react-router').History;

var NotebookIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { showDeletePrompt: false };
  },

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
  },

  toggleDeletePrompt: function(e) {
    //stopPropagation to stop the click event on the li element
    //That event displays the notes for the notebook
    //dont want this to happen when the user clicks Cancel
    //want to  keep the notebookindex displayed
    e.stopPropagation();
    var newState = !this.state.showDeletePrompt;
    this.setState( {showDeletePrompt: newState} );
  },

  showDeletePrompt: function(e) {
    //stop the click event on the parent li, which displays the notes
    //for the selected notebook
    e.stopPropagation();

    //Call setState - showDeletePrompt: true
    this.setState({ showDeletePrompt: true });

    //Might have to call setState again after note is deleted,
    //to re-render the NotesIndexItem without the prompt
    //   //if note to delete is currently the one displayed,
    //   //after deleting it, add callback which pushes state to next note in list
  },

  deleteNotebook: function(e) {
    e.stopPropagation();

    // debugger

    NotebookApiUtil.deleteNotebook(this.props.notebook, function(remainingNotebooks){
      //NOTE last notebook might not have any notes
      //TODO dont let user delete their last notebook
      if (remainingNotebooks[0].notes.length > 0) {
        var noteToRedirectTo = remainingNotebooks[0].notes[0].id;
        this.history.pushState(null, "/notes/" + noteToRedirectTo);
      }
      else {
        this.history.pushState(null, "/notes/");
      }
    }.bind(this));
  },

  render: function() {

    var deletePrompt = "";
    if (this.state.showDeletePrompt) {
      deletePrompt = <DeletePrompt key={1}
                          classes = "delete-prompt-notebook"
                          message={"Are you sure you want to delete this notebook?\n Note this will delete all notes within this notebook"}
                          callback={this.toggleDeletePrompt}
                          deleteFunction={this.deleteNotebook}/>;
    }

    return(
      <li className="notebook-index-item" onClick={this.displayNotebookNotes}>
        <div className="notebook-index-item-header group">
          <h3 className="notebook-index-title">{this.props.notebook.title}</h3>
          <i className="fa fa-lg fa-trash notebook-delete-icon" onClick={this.showDeletePrompt}></i>
        </div>
        <p>{this.props.notebook.notes.length} notes</p>

        <ReactCSSTransitionGroup transitionName="delete-prompt-notebook"
                                  transitionEnterTimeout={300}
                                  transitionLeaveTimeout={300}>

        { deletePrompt }
        </ReactCSSTransitionGroup>

      </li>
    );
  }
});

module.exports = NotebookIndexItem;
