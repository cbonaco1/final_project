var React  = require('react');
var NoteStore = require('../../stores/note');
var NotesAPIUtil = require('../../util/notes_api_util');
var NotebookStore = require('./../../stores/notebook');

var _editor;

var NoteDetail = React.createClass({

  //state will be the note object
  getInitialState: function() {
    return { note: this.getStateFromStore() };
  },

  getStateFromStore: function() {
    return NoteStore.find(this.props.params.id);
  },

  //listener method on NoteStore
  _changeNote: function() {
    //this works, state is updated to note clicked
    this.setState({note: this.getStateFromStore() });
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
    _editor.addModule('toolbar', { container: '#toolbar'});
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
    // this.history.pushState(null, "/notes/" + this.state.note.id);
    this.listenerToken = NoteStore.addListener(this._changeNote);
    NotesAPIUtil.fetchSingleNote(this.props.params.id);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
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
      notebookDropdownOptions = note.author.notebooks.map(function(notebook, index){
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
    // <Toolbar editor={editor} />

    //Include dropdown for Notebook here
    return(
      <div className="note-detail">
        <input type="text" value={title} onChange={this.updateNoteTitle}/>
        <div id="toolbar">
          <div className="ql-format-group">
            <button className="ql-bold ql-format-button"></button>
            <button className="ql-italic ql-format-button"></button>
            <button className="ql-underline ql-format-button"></button>
          </div>
          <select className="ql-size">
            <option value="10px">Small</option>
            <option value="13px">Normal</option>
            <option value="18px">Large</option>
            <option value="32px">Huge</option>
          </select>
          <select title="Text Color" className="ql-color">
            <option value="rgb(255, 255, 255)"></option>
            <option value="rgb(0, 0, 0)"></option>
            <option value="rgb(255, 0, 0)"></option>
            <option value="rgb(0, 0, 255)"></option>
            <option value="rgb(0, 255, 0)"></option>
            <option value="rgb(0, 128, 128)"></option>
            <option value="rgb(255, 0, 255)"></option>
            <option value="rgb(255, 255, 0)"></option>
          </select>

          <select className="notebook-dropdown" value={selectedNotebook} onChange={this.updateNotebook}>
            {notebookDropdownOptions}
          </select>

          <i id="editor-save-icon" className="fa fa-floppy-o sidebar-icon" onClick={this.updateNote}></i>
        </div>
        <div id="note-detail-content"></div>
      </div>
    );
  }
});

module.exports = NoteDetail;
