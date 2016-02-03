var React = require('react');
var NotesAPIUtil = require('./../../util/notes_api_util');
var History = require('react-router').History;


var NotesIndexItem = React.createClass({
  mixins: [History],

  //called before initial render
  //When the page is loaded, this renders the NoteDetails of the first note
  componentWillMount: function() {
    // console.log("Enter will mount: " + this.props.note.id);
    if (this.props.active === true) {
      this.history.pushState(null, "/notes/" + this.props.note.id);
    }
  },

  showNote: function(e) {
    this.props.active = true;
    //this.setState({active: true})
    //need to trigger a re-render of the item

    //Whichever note is selected gets a border and is activenote
    // $(".note-list li").removeClass("active-note");
    // $(e.currentTarget).addClass("active-note");
    //Toggle the NoteDetail to be this Note

    this.history.pushState(null, "/notes/" + this.props.note.id);
  },

  deleteNote: function() {
    NotesAPIUtil.deleteNote(this.props.note);
  },

  formatDate: function(dateIn) {
    var date = new Date(dateIn);
    return (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
  },

  render: function() {
    // console.log("Enter index item render");

    var classes = "user-note";
    if (this.props.active === true) {
      classes += " active-note";
      // this.history.pushState(null, "/notes/" + this.props.note.id);
    }

    return(
      <li className={classes} onClick={this.showNote}>
        <div className="user-note-content">
          <div className="note-content-header group">
            <h3 className="note-title">{this.props.note.title}</h3>
            <i className="fa fa-2x fa-trash note-delete-icon" onClick={this.deleteNote}></i>
          </div>
          <p>{this.props.note.body.substring(0, 100)}</p>
          <p>{this.formatDate(this.props.note.updated_at)}</p>
        </div>
      </li>
    );
  }
});

module.exports = NotesIndexItem;
