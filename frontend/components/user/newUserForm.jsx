var React = require('react');
var ErrorMessages = require('./../errorMessages');

var NewUserForm = React.createClass({
  render: function() {
    return(
      <div className="user-form">
        <h2 className="form-header">Create Account</h2>
        <form className="new-form" action="<%= users_url %>" method="post">

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
