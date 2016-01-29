var React = require('react');

var NewSessionForm = React.createClass({

  submit: function() {

  },

  render: function() {
    return(
      <div className="user-form">
        <h2 className="form-header">Sign in</h2>
        <form className="new-form" onSubmit={this.submit}>

          <div className="input-field">
            <label>Username:
              <input type="text" name="user[username]" autofocus />
            </label>
          </div>

          <div className="input-field">
            <label>Password:
              <input type="password" name="user[password]" />
            </label>
          </div>

          <button className="form-button">Sign In</button>
        </form>

        <div className="sign-in-msg">
          <p>Dont have an account?</p>
          <a href="#/users/new">Create account</a>
        </div>

      </div>
    );
  }
});

module.exports = NewSessionForm;
