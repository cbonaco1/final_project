var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var History = ReactRouter.History;

var NewUserForm = require('./components/user/newUserForm');
var NewSessionForm = require('./components/user/newSessionForm');

var App = React.createClass({

  goToSignUp: function() {
    this.props.history.pushState(null, 'users/new', {});
  },

  goToSignIn: function() {
    this.props.history.pushState(null, 'session/new', {});
  },

  render: function() {
    return(
      <div>
        <header>
          <h1>Welcome to FeatherNote!</h1>
          <p>FeatherNote is a note-taking application designed
          to simplify a way for you to organize your notes and
        simplify your life!</p>
      <p>FeatherNote is inspired by Evernote and is written using the Rails
      webframework and React.js</p>
    <button className="form-button" onClick={this.goToSignUp}>Sign Up</button>
    <button className="form-button" onClick={this.goToSignIn}>Sign In</button>
        </header>
        {this.props.children}
      </div>
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={App} />
    <Route path="users/new" component={NewUserForm} />
    <Route path="session/new" component={NewSessionForm} />
  </Router>
);

document.addEventListener("DOMContentLoaded", function(e) {
  var root = document.getElementById("content");
  ReactDOM.render(router, root);
});
