var React = require('react');
var ReactDOM = require('react-dom');
var NoteStore = require('../../stores/note');
var NotesAPIUtil = require('../../util/notes_api_util');
var NoteIndexItem = require('./notesIndexItem');
var History = require('react-router').History;

var NotesIndex = React.createClass({

  mixins: [History],

  getInitialState: function() {
    return { notes: NoteStore.all() };
  },

  _onChange: function() {
    this.setState({ notes: NoteStore.all() });
  },

  //invoked only once, after the initial rendering
  componentDidMount: function() {
    this.listenerToken = NoteStore.addListener(this._onChange);
    NotesAPIUtil.fetchAllNotes();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  render: function() {

    var noteList = "";

    if (this.state.notes.length > 0) {
      //order of this.state.notes might not be order needed
      noteList = this.state.notes.map(function(note, index){
        //add active-note class to the first item in list
        var active = false;
        if (index === 0) {
          active = true;
        }
        return <NoteIndexItem key={note.id} note={note} active={active}/>;
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
