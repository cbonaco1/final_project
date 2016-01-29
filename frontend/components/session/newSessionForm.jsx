var React = require('react');
var SessionsApiUtil = require('./../../util/session_api_util');
var History = require('react-router').History;

var NewSessionForm = React.createClass({

  mixins: [History],

  submit: function(e) {
    e.preventDefault();
    var fields = $(e.currentTarget).serializeArray();
    var credentials = {};
    fields.forEach(function(field){
      credentials[field.name] = field.value;
    });

    //Go to notes page after successful login
    SessionsApiUtil.login(credentials, function(){
      console.log("entered callback");
      this.history.pushState(null, "/notes");
    }.bind(this));

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