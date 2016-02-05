var React = require('react');
var ErrorMessages = require('./../errorMessages');
var ErrorStore = require('./../../stores/errors');
var UserApiAUtil = require('./../../util/user_api_util');
var NotebookApiUtils = require('./../../util/notebooks_api_util');
var NoteApiUtils = require('./../../util/notes_api_util');
var NoteConstants = require('./../../constants/note_constants');
var History = require('react-router').History;

var NewUserForm = React.createClass({

  mixins: [History],

  addUser: function(e) {
    e.preventDefault();
    var fields = $(e.currentTarget).serializeArray();
    var credentials = {};
    fields.forEach(function(field){
      credentials[field.name] = field.value;
    });

    UserApiAUtil.createUser(credentials, function(user) {
      this.setUpUser(user);
      this.history.pushState(null, "/notes");
    }.bind(this));

  },

  //Clear errors when this thing unmounts
  componentWillUnmount: function() {
    ErrorStore.clearMessages();
  },

  setUpUser: function(user, callback) {
    var newNotebook = {
          author_id: user.id,
          title: "First Notebook",
          description: "This is your first notebook on FeatherNote!"
    };

    var welcomeNote = {
          author_id: user.id,
          title: NoteConstants.NEW_NOTE_TITLE,
          body: NoteConstants.NEW_NOTE_BODY
    };

    var instructionalNote = {
      author_id: user.id,
      title: NoteConstants.INSTRUCTION_NOTE_TITLE,
      body: NoteConstants.INSTRUCTION_NOTE_BODY
    };

    //Create new user notes/notebook
    NotebookApiUtils.createNotebook(newNotebook, function(newNotebook){
      welcomeNote["notebook_id"] = newNotebook.id;
      NoteApiUtils.addNote(welcomeNote);
    }.bind(this));

  },

  render: function() {
    return(
      <div className="user-form">
        <h2 className="form-header">Create Account</h2>
        <form className="new-form" onSubmit={this.addUser}>

          <div className="input-field">
            <label>Username:
              <input type="text" name="username" autoFocus />
            </label>
          </div>

          <div className="input-field">
            <label>Password:
              <input type="password" name="password" />
            </label>
          </div>

          <ul className="new-user-bottom-icons group">
            <li className="create-account-link">
              <button className="create-account-button form-button">Create Account!</button>
            </li>
            <li className="icon-container new-user-home-icon">
              <a href="/#">
                <i className="icon-item home-icon fa fa-home fa-lg"></i>
              </a>
            </li>
          </ul>
        </form>

        <ErrorMessages />

        <div className="sign-in-msg">
          <p>Already have an account?</p>
          <a href="#/session/new">Sign in</a>
        </div>

      </div>
    );
  }
});

module.exports = NewUserForm;
