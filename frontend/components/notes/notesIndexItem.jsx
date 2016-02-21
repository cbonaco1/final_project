var React = require('react');
var NotesAPIUtil = require('./../../util/notes_api_util');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var DeletePrompt = require('./../deletePrompt');
var History = require('react-router').History;


var NotesIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {
        selected: this.props.active,
        showDeletePrompt: false
       };
  },

  //called before initial render
  //When the page is loaded, this renders the NoteDetails of the first note
  componentWillMount: function() {
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

  showPrompt: function(e) {
    //stopPropagation so the showNote function does not run
    e.stopPropagation();

    this.setState({ showDeletePrompt: true });
  },

  toggleDeletePrompt: function(e) {
    e.stopPropagation();
    var newState = !this.state.showDeletePrompt;
    this.setState( {showDeletePrompt: newState} );
  },

  removeNote: function(e) {

    e.stopPropagation();

    NotesAPIUtil.deleteNote(this.props.note, function(remainingNotes){
      //if user just deleted last note, show /notes
      if (remainingNotes.length === 0) {
        this.history.pushState(null, "/notes/");
      }
      else {
        var query = window.location.hash.indexOf("?");
        var urlNoteId = parseInt(window.location.hash.substring(8, query));


        if (urlNoteId === this.props.note.id) {
          //NOTE this is only for when the user clicks DELETE
          //not when deleting a notebook triggers a delete of notes

          //Redirect to another note show page
          this.history.pushState(null, "/notes/" + remainingNotes[0].id);
        }
      }
    }.bind(this));
  },

  formatDate: function(dateIn) {
    var date = new Date(dateIn);
    return (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
  },

  render: function() {
    var note = this.props.note;
    var body = "";
    var title = "";
    var deletePrompt = "";

    var classes = "user-note group";
    if (this.props.active === true) {
      //This prints the active note, need to go to it route
      classes += " active-note";
    }

    if (note.body) {
      body = note.body.substring(0, 100);
    }

    if (note.title) {
      title = note.title;
    }

    if (this.state.showDeletePrompt) {
      deletePrompt = <DeletePrompt key={1}
              classes = "delete-prompt-note"
              message = "Are you sure you want to delete this note?"
              callback={this.toggleDeletePrompt}
              deleteFunction={this.removeNote}/>;
    }

    //Use ReactCSSTransitionGroup around the delete prompt
    //Make DeletePrompt a component
    return(
      <li className={classes} onClick={this.showNote}>
        <div className="user-note-content">
          <div className="note-content-header group">
            <h3 className="note-title">{title}</h3>
            <i className="fa fa-2x fa-trash note-delete-icon" onClick={this.showPrompt}></i>
          </div>
          <p>{body}</p>
        </div>

        <ReactCSSTransitionGroup transitionName="delete-prompt-note"
                                  transitionEnterTimeout={300}
                                  transitionLeaveTimeout={300}>
          { deletePrompt }
        </ReactCSSTransitionGroup>


      </li>
    );
  }
});

module.exports = NotesIndexItem;
