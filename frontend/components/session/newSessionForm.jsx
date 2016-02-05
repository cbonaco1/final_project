var React = require('react');
var SessionsApiUtil = require('./../../util/session_api_util');
var History = require('react-router').History;
var ErrorMessages = require('./../errorMessages');
var ErrorStore = require('./../../stores/errors');

var NewSessionForm = React.createClass({

  mixins: [History],

  redirectToNotes: function() {
    //history is defined in the mixin
    this.history.pushState(null, "/notes");
  },

  submit: function(e) {
    e.preventDefault();
    var fields = $(e.currentTarget).serializeArray();
    var credentials = {};
    fields.forEach(function(field){
      credentials[field.name] = field.value;
    });

    //Go to notes page after successful login
    SessionsApiUtil.login(credentials, this.redirectToNotes);

  },

  render: function() {

    return(
      <div className="user-form">
        <h2 className="form-header">Sign in</h2>
        <form className="new-form" onSubmit={this.submit}>

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

          <ul className="sign-in-buttons group">
            <li>
              <button id="new-session-sign-in" className="form-button">Sign In</button>
            </li>
            <li id="sign-in-facebook-icon" title="Log in with Facebook!" className="icon-container social-media-login">
              <a href="/auth/facebook">
                <i id="fb-icon-new-session" className="fa fa-facebook fa-2x icon-item social-media-icon"></i>
              </a>
            </li>
            <li className="icon-container">
              <a href="/#">
                <i className="icon-item home-icon fa fa-home fa-lg"></i>
              </a>
            </li>
          </ul>
        </form>

        <ErrorMessages />

        <div className="sign-in-msg">
          <p>Dont have an account?</p>
          <a href="#/users/new">Create account</a>
        </div>

      </div>
    );
  }
});

module.exports = NewSessionForm;
