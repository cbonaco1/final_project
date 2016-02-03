var React  = require('react');
var NoteStore = require('../../stores/note');
var NotesAPIUtil = require('../../util/notes_api_util');
var NotebookAPIUtil = require('../../util/notebooks_api_util');
var NotebookStore = require('./../../stores/notebook');
var Toolbar = require('./../toolbar');

var _editor;

var NoteDetail = React.createClass({

  //state will be the note object
  getInitialState: function() {
    return { note: this.getStateFromStore(), notebooks: NotebookStore.all() };
  },

  getStateFromStore: function() {
    return NoteStore.find(this.props.params.id);
  },

  //listener method on NoteStore
  _changeNote: function() {
    //this works, state is updated to note clicked
    this.setState({note: this.getStateFromStore() });
  },

  _changeNotebooks: function() {
    this.setState( { notebooks: NotebookStore.all() } );
  },

  updateNote: function() {
    NotesAPIUtil.updateNote(this.state.note);
  },

  updateNotebook: function(e) {
    //Get the index of the selected notebook from the dropdown
    var notebookIndex = e.target.selectedIndex;
    var newNotebook = this.state.note.author.notebooks[notebookIndex];
    var currentNote = this.state.note;
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
    _editor.on('text-change', function(delta, source){
      //only set state if user made change to text (not API)
      if (source === 'user') {
        var currentNote = this.state.note;
        currentNote["body"] = _editor.getText();
        this.setState(currentNote);
      }
    }.bind(this));
  },

  //called when there are new props
  componentWillReceiveProps: function(newProps) {
    NotesAPIUtil.fetchSingleNote(newProps.params.id);
  },

  //called before initial rendering occurs
  componentWillMount: function() {
    this.noteListenerToken = NoteStore.addListener(this._changeNote);
    this.notebookListenerToken = NotebookStore.addListener(this._changeNotebooks);
    NotesAPIUtil.fetchSingleNote(this.props.params.id);
    NotebookAPIUtil.fetchCurrentUserNotebooks();
  },

  componentWillUnmount: function() {
    this.noteListenerToken.remove();
    this.notebookListenerToken.remove();
  },

  //this.props.params.id will contain the message id
  render: function() {

    var note = this.state.note;
    var selectedNotebook;
    var notebookDropdownOptions = [];
    var title = "";

    if (note.id) {
      if (_editor) {
        _editor.setText(note.body);
      }
      notebookDropdownOptions = this.state.notebooks.map(function(notebook, index){
        return <option key={notebook.id} value={notebook.id}>{notebook.title}</option>;
      }.bind(this));

      selectedNotebook = note.notebook.id;

      title = note.title;
    }

    //TODO add date here
    //TODO Notebook title needs to be a dropdown of all notebooks,
    //make selected Notebook have class ql-selected
    //TODO Make Toolbar React component containing these items
    //in order to allow user to change the notebook for a note
    //pass the editor as a prop:

    return(
      <div className="note-detail">
        <input type="text" value={title} className="note-title-field" onChange={this.updateNoteTitle}/>

        <Toolbar editor={_editor}
                notebooks={notebookDropdownOptions}
                selectedNotebook={selectedNotebook}
                notebookChange={this.updateNotebook}
                updateNote={this.updateNote}
        />
        <div id="note-detail-content"></div>
      </div>
    );
  }
});

module.exports = NoteDetail;
