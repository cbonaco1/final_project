var React  = require('react');
var NoteStore = require('../../stores/note');
var NotesAPIUtil = require('../../util/notes_api_util');
var NotebookAPIUtil = require('../../util/notebooks_api_util');
var NotebookStore = require('./../../stores/notebook');
var Toolbar = require('./../toolbar');

var _editor;

var NoteDetail = React.createClass({

  getInitialState: function() {
    return {
              note: this.getNoteFromStore(),
              notebooks: this.getNotebooksFromStore()
            };
  },

  //called before initial rendering occurs
  componentWillMount: function() {
    this.noteListenerToken = NoteStore.addListener(this._changeNote);
    this.notebookListenerToken = NotebookStore.addListener(this._changeNotebooks);

    NotesAPIUtil.fetchSingleNote(this.props.params.id);
  },

  componentWillUnmount: function() {
    this.noteListenerToken.remove();
    this.notebookListenerToken.remove();
  },

  getNoteFromStore: function() {
    return NoteStore.find(this.props.params.id);
  },

  getNotebooksFromStore: function() {
    return NotebookStore.all();
  },

  //listener method on NotebookStore
  _changeNotebooks: function() {
    this.setState({ notebooks: this.getNotebooksFromStore() });
  },

  //listener method on NoteStore
  _changeNote: function() {
    this.setState( {note: this.getNoteFromStore() });
  },

  //saves Note to database
  updateNote: function() {
    //set body of this.state.note to contents of text editor
    //only when the user clicks save, otherwise it will re-render
    //the note body everytime. This moved the cursor to the end of the line
    //when the user edited middle of body
    var noteBody = _editor.getText();
    var currentNote = this.state.note;
    currentNote["body"] = noteBody;
    NotesAPIUtil.updateNote(currentNote);
  },

  //This is when the user changes the notebook using the dropdown
  //TODO this will probably change
  updateNotebook: function(e) {
    //Get the index of the selected notebook from the dropdown
    var notebookIndex = e.target.selectedIndex;

    //this.state.note.author.notebooks does not have the new ntoebook yet
    var newNotebook = this.state.notebooks[notebookIndex];
    var currentNote = this.state.note;
    // debugger
    currentNote["notebook"] = newNotebook;
    currentNote["notebook_id"] = newNotebook.id;
    this.setState(currentNote);
  },

  updateNoteTitle: function(e) {
    var newTitle = e.target.value;
    var currentNote = this.state.note;
    currentNote["title"] = newTitle;
    this.setState(currentNote);
  },

  //invoked once, after initial rendering
  componentDidMount: function() {
    _editor = new Quill("#note-detail-content", {theme:'snow'});
    _editor.addModule('toolbar', { container: '.toolbar'});
    _editor.on('text-change', function(delta, source) {
      //this is where the formatting can be changed
      if (source === "user") {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(function() {
          var currentNote = this.state.note;
          currentNote["body"] = _editor.getText();
          // this.setState(currentNote);
        }.bind(this), 500);
      }
    }.bind(this));

  },

  //called when there are new props (navigating to new link)
  componentWillReceiveProps: function(newProps) {
    NotesAPIUtil.fetchSingleNote(newProps.params.id);
  },

  render: function() {
    var currentNote = this.state.note;
    var notebookDropdown = <select className="notebook-dropdown"><option></option></select>;
    var selectedNotebook;
    var textEditor;
    var title = "";

    if (currentNote) {
      if (currentNote.id) {
        if (_editor) {
          var noteBody;
          if (currentNote.body) {
            noteBody = currentNote.body;
          }
          else {
            noteBody = "You can add text to your note here..."
          }
          _editor.setText(noteBody);
        }

        selectedNotebook = currentNote.notebook.id;

        title = currentNote.title;

        //Generate the list of notebooks
        if (this.state.notebooks.length > 0) {
          // debugger
          var notebookDropdownOptions = this.state.notebooks.map(function(notebook, index){
            return <option key={notebook.id} value={notebook.id}>{notebook.title}</option>;
          }.bind(this));

          notebookDropdown = (
            <select className="notebook-dropdown" value={currentNote.notebook.id} onChange={this.updateNotebook}>
              {notebookDropdownOptions}
            </select>
          );
        }
      }

    }

    //pass notebook dropdown to Toolbar as a prop
    return(
      <div className="note-detail">
        <input type="text" value={title}
                className="note-title-field"
                onChange={this.updateNoteTitle} />

        <Toolbar editor={_editor}
                notebooks={notebookDropdown}
                updateNote={this.updateNote} />

        <div id="note-detail-content" className="note-content"></div>
      </div>
    );
  }
});

module.exports = NoteDetail;
