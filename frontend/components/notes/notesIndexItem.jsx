var React = require('react');
var NoteDetail = require("./noteDetail");
var History = require('react-router').History;


var NotesIndexItem = React.createClass({
  mixins: [History],

  showNote: function(e) {
    //Whichever note is selected gets a border and is activenote
    $(".note-list li").removeClass("active-note");
    $(e.currentTarget).addClass("active-note");
    //Toggle the NoteDetail to be this Note

    this.history.pushState(null, "/notes/" + this.props.note.id);
  },

  formatDate: function(dateIn) {
    var date = new Date(dateIn);
    return (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
  },

  render: function() {
    return(
      <li className={"user-note" + this.props.classes} onClick={this.showNote}>
        <div className="user-note-content">
          <h3>{this.props.note.title}</h3>
          <p>{this.props.note.body}</p>
          <p>{this.formatDate(this.props.note.updated_at)}</p>
        </div>
      </li>
    );
  }
});

module.exports = NotesIndexItem;
