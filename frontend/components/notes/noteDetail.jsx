var React  = require('react');
var NoteStore = require('../../stores/note');
var NotesAPIUtil = require('../../util/notes_api_util');

var _editor;

var NoteDetail = React.createClass({

  //state will be the note object
  getInitialState: function() {
    //do something here to get the first one to display
    // return { note: this.getFirstNoteFromStore() };
    return { note: this.getStateFromStore() };
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

  //invoked once, after initial rendering
  componentDidMount: function() {
    _editor = new Quill("#note-detail-content", {theme:'snow'});
    _editor.addModule('toolbar', { container: '#toolbar'});
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
    //TODO Notebook title needs to be a dropdown of all notebooks,
    //in order to allow user to change the notebook for a note

    if (note) {
      _editor.setText(this.state.note.body);
    }

    return(
      <div className="note-detail">
        <h2>These are the note details</h2>
        <div id="toolbar">
          <button className="ql-bold ql-format-button"></button>
          <button className="ql-italic ql-format-button"></button>
          <button className="ql-underline ql-format-button"></button>
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
        </div>
        <div id="note-detail-content"></div>
      </div>
    );
  }
});

module.exports = NoteDetail;
