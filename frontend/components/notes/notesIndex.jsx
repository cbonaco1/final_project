var React = require('react');
var ReactDOM = require('react-dom');
var NoteStore = require('../../stores/note');
var apiUtil = require('../../util/apiUtil');
var NoteIndexItem = require('./notesIndexItem');
var History = require('react-router').History;

var NotesIndex = React.createClass({

  mixins: [History],

  getInitialState: function() {
    var allNotes = NoteStore.all();
    return { notes: allNotes, activeNoteIndex: 0 };
  },

  _onChange: function() {
    this.setState({ notes: NoteStore.all(), activeNoteIndex: 0 });

    // var index = this.state.activeNoteIndex;
    // var allNotes = this.state.notes;
    // this.history.pushState(null, "/notes/" + allNotes[index].id);
  },

  componentDidMount: function() {
    this.listenerToken = NoteStore.addListener(this._onChange);
    apiUtil.fetchAllNotes();


  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  // componentDidUpdate: function() {
  //   // debugger
  //   if (this.state.notes.length > 0) {
  //     var firstNote = this.state.notes[0].toString();
  //     // this.history.pushState(null, "/notes/" + firstNote.id);
  //   }
  // },

  render: function() {

    var noteList = "";
    var activeNoteIndex = this.state.activeNoteIndex

    if (this.state.notes.length > 0) {
      noteList = this.state.notes.map(function(note, index){
        //add active-note class to the first item in list
        var classes = "";
        if (index === activeNoteIndex) {
          classes = " active-note";
        }
        return <NoteIndexItem key={note.id} note={note} classes={classes}/>;
      }.bind(this));
    }

    return(
      <div className="note-container">
        <h3>Notes</h3>
        <p className="note-count">{this.state.notes.length} notes</p>
        <ul className="note-list">
          {noteList}
        </ul>
      </div>
    );
  }
});

module.exports = NotesIndex;
