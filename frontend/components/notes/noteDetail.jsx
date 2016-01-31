var React  = require('react');
var NoteStore = require('../../stores/note');
var NotesAPIUtil = require('../../util/notes_api_util');

var NoteDetail = React.createClass({

  //state will be the note object
  getInitialState: function() {
    //do something here to get the first one to display
    return { note: this.getFirstNoteFromStore() };
  },

  getStateFromStore: function() {
    return NoteStore.find(this.props.params.id);
  },

  getFirstNoteFromStore: function() {
    return NoteStore.firstNote();
  },

  _changeNote: function() {
    this.setState({note: this.getStateFromStore() });
  },

  //note sure why this is not componentDidMount
  componentWillReceiveProps: function(newProps) {
    NotesAPIUtil.fetchSingleNote(newProps.params.id);
  },

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
    var content;
    //TODO add date here
    if (note) {
      content =
        <div className="note-detail-content">
          <h2 className="note-detail-title">{note.title}</h2>
          <p className="note-detail-body">{note.body}</p>
        </div>
    }

    return(
      <div className="note-detail">
        <h2>These are the note details</h2>
        {content}
      </div>
    );
  }
});

module.exports = NoteDetail;
