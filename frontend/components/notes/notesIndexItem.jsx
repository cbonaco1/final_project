var React = require('react');
var NotesAPIUtil = require('./../../util/notes_api_util');
var History = require('react-router').History;


var NotesIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { selected: this.props.active };
  },

  //called before initial render
  //When the page is loaded, this renders the NoteDetails of the first note
  componentWillMount: function() {
    // console.log("Enter will mount: " + this.props.note.id);
    if (this.props.active === true) {
      this.history.pushState(null, "/notes/" + this.props.note.id);
    }
  },

  showNote: function(e) {
    // this.props.active = true;
    this.setState({selected: true});
    //need to trigger a re-render of the item

    //Whichever note is selected gets a border and is activenote
    $(".note-list li").removeClass("active-note");
    $(e.currentTarget).addClass("active-note");
    //Toggle the NoteDetail to be this Note

    this.history.pushState(null, "/notes/" + this.props.note.id);
  },

  deleteNote: function(e) {
    //stopPropagation so the showNote function does not run
    e.stopPropagation();
    var del = window.confirm("Are you sure you want to delete this Note?");
    if (del) {
      //if note to delete is currently the one displayed,
      //after deleting it, add callback which pushes state to next note in list
      var query = window.location.hash.indexOf("?");
      var urlNoteId = parseInt(window.location.hash.substring(8, query));
      var callback;
      if (urlNoteId === this.props.note.id) {
        // debugger
      }
      NotesAPIUtil.deleteNote(this.props.note);
    }
  },

  formatDate: function(dateIn) {
    var date = new Date(dateIn);
    return (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
  },

  render: function() {
    var note = this.props.note;
    var body = "";
    var title = "";

    var classes = "user-note";
    if (this.props.active === true) {
      classes += " active-note";
    }

    if (note.body) {
      body = note.body.substring(0, 100);
    }

    if (note.title) {
      title = note.title;
    }

    return(
      <li className={classes} onClick={this.showNote}>
        <div className="user-note-content">
          <div className="note-content-header group">
            <h3 className="note-title">{title}</h3>
            <i className="fa fa-2x fa-trash note-delete-icon" onClick={this.deleteNote}></i>
          </div>
          <p>{body}</p>
          <p>{this.formatDate(this.props.note.updated_at)}</p>
        </div>
      </li>
    );
  }
});

module.exports = NotesIndexItem;
