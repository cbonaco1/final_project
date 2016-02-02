var React = require('react');
var NoteApiUtil = require('./../../util/notes_api_util');
var Toolbar = require('./../toolbar');

var NoteForm = React.createClass({

  //NEED TOOLBAR component

  getInitialState: function() {
    return( {note: null});
  },

  addNote: function() {
    //NoteApiUtil.addNote(this.state.note);
  },

  //Need current user
  //Need dropdown of their notebooks
  render: function() {
    return(
      <div className="note-form-outline">
        <div className="note-form">
          <input type="text" value="Add Note Title Here..." className="note-title-field" />
          <textarea className="note-body"></textarea>
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
