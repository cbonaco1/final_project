var React = require('react');
var ErrorMessages = require('./../errorMessages');
var UserApiAUtil = require('./../../util/user_api_util');
var NotebookApiUtils = require('./../../util/notebooks_api_util');
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

  setUpUser: function(user) {
    var newNotebook = {author_id: user.id,
                      title: "First Notebook",
                      description: "This is your first notebook"};

    //Create new user notes/notebook
    NotebookApiUtils.createNotebook(newNotebook);

    //TODO: Display some type of welcome message to the new user
    //Open up the new note field
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

          <button className="form-button">Create Account!</button>

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
