var React = require('react');
var NotebookIndex = require('./../notebooks/notebookIndex');
var NotebookApiUtil = require('./../../util/notebooks_api_util');
var NoteApiUtil = require('./../../util/notes_api_util');
var NoteForm = require('./../notes/newNoteForm');

var Sidebar = React.createClass({

  getInitialState: function() {
    return( {showNoteModal: false, showNotebookModal: false} );
  },

  addNote: function() {
    this.setState( {showNoteModal: true} );
  },

  showNotes: function() {
    //Show ALL notes, ordered by date
    NoteApiUtil.fetchAllNotes();
    //hide
  },

  toggleNoteModal: function() {
    var newState = !this.state.showNoteModal;
    this.setState( {showNoteModal: newState} );
  },

  toggleNotebookModal: function() {
    var newState = !this.state.showNotebookModal;
    this.setState( {showNotebookModal: newState} );
  },

  showNotebooks: function() {
    //Display list of users notebooks
    //When user clicks on a notebook,
    //display all notes just for that notebook
    this.setState({showNotebookModal: true});
    NotebookApiUtil.fetchCurrentUserNotebooks();
  },

  render: function() {

    //if showNoteModal = true, then set modal = NoteForm component
    var noteModal;
    var notebookModal;
    if (this.state.showNoteModal) {
      noteModal = <NoteForm callback={this.toggleNoteModal}/>;
    }

    if (this.state.showNotebookModal) {
      notebookModal = <NotebookIndex callback={this.toggleNotebookModal}/>;
    }

    return (
      <div className="sidebar-component">
        <ul className="sidebar-component-list">
          <li className="sidebar-icons" onClick={this.addNote}>
            <i className="fa fa-plus-circle fa-2x sidebar-icon"></i>
          </li>
          <li className="sidebar-icons" onClick={this.showNotes}>
            <i className="fa fa-file fa-lg sidebar-icon"></i>
          </li>
          <li className="sidebar-icons" onClick={this.showNotebooks}>
            <i className="fa fa-book fa-lg sidebar-icon"></i>
          </li>
          <li className="sidebar-icons">
            <i className="fa fa-tags fa-lg sidebar-icon"></i>
          </li>
        </ul>
        {noteModal}
        {notebookModal}
      </div>
    );
  }
});

module.exports = Sidebar;
