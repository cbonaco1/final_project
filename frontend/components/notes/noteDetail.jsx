var React  = require('react');
var NoteStore = require('../../stores/note');
var apiUtil = require('../../util/apiUtil');

var NoteDetail = React.createClass({

  //state will be the note object
  getInitialState: function() {
    return { note: this.getStateFromStore() };
  },

  getStateFromStore: function() {
    NoteStore.find(this.props.params.id);
  },

  _changeNote: function() {
    this.setState({note: this.getStateFromStore() });
  },

  //note sure why this is not componentDidMount
  componentWillReceiveProps: function(newProps) {
    apiUtil.fetchSingleNote(newProps.params.id);
  },

  componentWillMount: function() {
    this.listenerToken = NoteStore.addListener(this._changeNote);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  //this.props.params.id will contain the message id
  render: function() {
    var note = this.state.note;
    return(
      <div className="note-detail">
        <h2>These are the note details</h2>
        <h2>{note.title}</h2>
        <p>{note.body}</p>
      </div>
    );
  }
});

module.exports = NoteDetail;
