var React = require('react');
var NotebookIndex = require('./../notebooks/notebookIndex');
var NotebookApiUtil = require('./../../util/notebooks_api_util');
var NoteApiUtil = require('./../../util/notes_api_util');
var NoteForm = require('./../notes/newNoteForm');
var Search = require('./../search');

var Sidebar = React.createClass({

  getInitialState: function() {
    return( { showNoteModal: false,
              showNotebookModal: false,
              showSearchModal: false } );
  },

  addNote: function() {
    this.setState( {showNoteModal: true} );
  },

  showNotes: function() {
    //Show ALL notes, ordered by date
    NoteApiUtil.fetchAllNotes();
  },

  showSearch: function() {
    this.setState( {showSearchModal: true} );
  },

  showNotebooks: function() {
    //Display list of users notebooks
    //When user clicks on a notebook,
    //display all notes just for that notebook
    this.setState({showNotebookModal: true});
    NotebookApiUtil.fetchCurrentUserNotebooks();
  },

  toggleNoteModal: function() {
    var newState = !this.state.showNoteModal;
    this.setState( {showNoteModal: newState} );
  },

  toggleNotebookModal: function() {
    var newState = !this.state.showNotebookModal;
    this.setState( {showNotebookModal: newState} );
  },

  toggleSearchModal: function() {
    var newState = !this.state.showSearchModal;
    this.setState( {showSearchModal: newState} );
  },


  render: function() {

    //if showNoteModal = true, then set modal = NoteForm component
    var noteModal;
    var notebookModal;
    var searchModal;

    if (this.state.showNoteModal) {
      noteModal = <NoteForm callback={this.toggleNoteModal}/>;
    }

    if (this.state.showNotebookModal) {
      notebookModal = <NotebookIndex callback={this.toggleNotebookModal}/>;
    }

    if (this.state.showSearchModal) {
      searchModal = <Search callback={this.toggleSearchModal}/>;
    }

    return (
      <div className="sidebar-component">
        <ul className="sidebar-component-list">
          <li className="sidebar-icons" title="Search" onClick={this.showSearch}>
            <i className="fa fa-search fa-2x sidebar-icon"></i>
          </li>
          <li className="sidebar-icons" title="Add Note" onClick={this.addNote}>
            <i className="fa fa-plus-circle fa-2x sidebar-icon"></i>
          </li>
          <li className="sidebar-icons" title="Notes" onClick={this.showNotes}>
            <i className="fa fa-file fa-lg sidebar-icon"></i>
          </li>
          <li className="sidebar-icons" title="Notebooks" onClick={this.showNotebooks}>
            <i className="fa fa-book fa-lg sidebar-icon"></i>
          </li>
        </ul>
        {noteModal}
        {notebookModal}
        {searchModal}
      </div>
    );
  }
});

module.exports = Sidebar;
