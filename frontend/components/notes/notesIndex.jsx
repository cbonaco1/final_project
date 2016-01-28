var React = require('react');
var ReactDOM = require('react-dom');
var NoteStore = require('../../stores/note');
var apiUtil = require('../../util/apiUtil');
var NoteIndexItem = require('./notesIndexItem');

var NotesIndex = React.createClass({
  getInitialState: function() {
    return { notes: NoteStore.all() };
  },

  _onChange: function() {
    this.setState({ notes: NoteStore.all() });
  },

  componentDidMount: function() {
    this.listenerToken = NoteStore.addListener(this._onChange);
    apiUtil.fetchAllNotes();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  render: function() {

    var noteList = "";

    if (this.state.notes.length > 0) {
      noteList = this.state.notes.map(function(note, index){
        //add active-note class to the first item in list
        var classes = "";
        if (index === 0) {
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
