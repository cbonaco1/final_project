var React = require('react');
var History = require('react-router').History;


var NotesIndexItem = React.createClass({
  mixins: [History],

  //called before initial render
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

    // console.log(this.props.note);

    this.history.pushState(null, "/notes/" + this.props.note.id);
  },

  formatDate: function(dateIn) {
    var date = new Date(dateIn);
    return (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
  },

  render: function() {

    var classes = "user-note";



    if (this.props.active === true) {
      classes += " active-note";
      // this.history.pushState(null, "/notes/" + this.props.note.id);
    }

    return(
      <li className={classes} onClick={this.showNote}>
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
