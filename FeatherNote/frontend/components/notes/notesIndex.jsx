var React = require('react');
var NoteStore = require('../../stores/note');

var NotesIndex = React.createClass({
  getInitialState: function() {
    return { notes: NoteStore.all() };
  },

  _onChange: function() {
    this.setState({ notes: NoteStore.all() });
  },

  componentDidMount: function() {
    this.listenerToken = NoteStore.addListener(this._onChange);
    //apiutils.fetchNotes();
  },

  componentWillUnmount: function() {
    NoteStore.remove(this.listenerToken);
  },

  render: function() {
    var noteList = "";

    if (this.state.notes.length > 0) {
      noteList = this.state.notes.map(function(note){
        return <NoteIndexItem key={note.id} note={note} />;
      });
    }

    return(
      <ul>
        {noteList}
      </ul>
    );
  }
});

module.exports = NotesIndex;
