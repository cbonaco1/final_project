var React = require('react');
var NoteApiUtil = require('./../../util/notes_api_util');
var Toolbar = require('./../toolbar');
var CurrentUserStore = require('./../../stores/currentUserStore');
var NotebookStore = require('./../../stores/notebook');
var NotebookApiUtil = require('./../../util/notebooks_api_util');

var _editor;

var NoteForm = React.createClass({

  getInitialState: function() {
    var currentUser = CurrentUserStore.currentUser();
    return( {note: {author_id: currentUser.id } } );
  },

  componentDidMount: function() {
    _editor = new Quill("#new-note-content", {
      theme:'snow'
    });
    _editor.addModule('toolbar', { container: '.toolbar'});
    _editor.on('text-change', function(delta, source){
      //only set state if user made change to text (not API)
      if (source === 'user') {
        var currentNote = this.state.note;
        currentNote["body"] = _editor.getText();
        this.setState(currentNote);
      }
    }.bind(this));

    _editor.focus();

    this.listenerToken = NotebookStore.addListener(this._updateNotebooks);
    NotebookApiUtil.fetchCurrentUserNotebooks();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _updateNotebooks: function() {
    var allNotebooks = NotebookStore.all();
    var currentNote = this.state.note;

    //TODO might not be any notebooks for user
    currentNote["notebook_id"] = allNotebooks[0].id;
    this.setState({ note: currentNote, notebooks: allNotebooks });
  },

  updateNotebook: function(e) {
    var newNotebook = e.target.value;
    var currentNote = this.state.note;
    currentNote["notebook_id"] = parseInt(newNotebook);
    this.setState(currentNote);
  },

  updateTitle: function(e) {
    var newTitle = e.target.value;
    var currentNote = this.state.note;
    currentNote["title"] = newTitle;
    this.setState(currentNote);
  },

  addNote: function() {
    NoteApiUtil.addNote(this.state.note, this.props.callback);
  },

  //Need current user
  //Need dropdown of their notebooks
  render: function() {
    var note = this.state.note;
    var notebookDropdownOptions = [];
    var selectedNotebook;
    var title;

    if (note) {
      title = this.state.note.title;
      selectedNotebook = this.state.note.notebook_id;
    }

    return(
      <div className="modal-outline">
        <div className="note-form">
          <input type="text" value={title}
                  className="note-title-field"
                  placeholder="Title Your Note..."
                  onChange={this.updateTitle}
                    />
          <Toolbar editor={_editor}
                  selectedNotebook={selectedNotebook}
                  notebookChange={this.updateNotebook}
                  updateNote={this.addNote}
          />
          <div id="new-note-content" className="note-content"></div>
          <div className="new-note-buttons group">
            <button className="form-button cancel-note-button" onClick={this.props.callback}>Cancel</button>
            <button className="form-button add-note-button" onClick={this.addNote}>Add Note</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NoteForm;
