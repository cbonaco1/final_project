var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var History = ReactRouter.History;

var App = require('./components/app');
var NewUserForm = require('./components/user/newUserForm');
var NewSessionForm = require('./components/session/newSessionForm');
var NotesIndex = require('./components/notes/notesIndex');
var NoteDetail = require('./components/notes/noteDetail');
var Header = require('./components/header');

var CurrentUserStore = require('./stores/currentUserStore');
var SessionsApiUtil = require('./util/session_api_util');

var FeatherNote = React.createClass({

  mixins: [History],

  goToSignUp: function() {
    this.props.history.pushState(null, 'users/new', {});
  },

  goToSignIn: function() {
    this.props.history.pushState(null, 'session/new', {});
  },

  signInAsGuest: function() {
    SessionsApiUtil.loginAsGuest(function() {
      this.history.pushState(null, "/notes");
    }.bind(this));
  },

  render: function() {
    return(
      <div className="welcome-landing">
        <header>
          <h1 className="welcome-header">Welcome to FeatherNote!</h1>
          <div className="welcome-messages">
            <p>FeatherNote is a note-taking application designed
            to simplify a way for you to organize your notes and
            simplify your life!</p>
            <p>FeatherNote is inspired by Evernote and is written using the Rails
            webframework and React.js</p>
          </div>

          <button className="form-button" onClick={this.goToSignUp}>Sign Up</button>
          <button className="form-button" onClick={this.goToSignIn}>Sign In</button>

          <div className="sign-in-msg">
            <p className="social-message">Not sure if you want to join?</p>
            <button className="form-button" onClick={this.signInAsGuest}>
              Demo the app!
            </button>
          </div>

          <p className="social-message">Or log in with social media</p>
          <ul className="social-media-logins group">
            <li className="facebook-icon facebook-login social-media-login">
              <a href="/auth/facebook">
                <i className="fa fa-facebook fa-2x social-media-icon"></i>
              </a>
            </li>
            <li className="twitter-icon facebook-login social-media-login">
              <a href="/auth/twitter">
                <i className="fa fa-twitter fa-2x social-media-icon"></i>
              </a>
            </li>
          </ul>

        </header>
      </div>
    );
  }
});
var router = (
  <Router>
    <Route path="/" component={FeatherNote} />
    <Route path="notes" component={App} onEnter={_ensureLoggedIn}>
      <Route path=":id" component={NoteDetail} />
    </Route>
    <Route path="users/new" component={NewUserForm} />
    <Route path="session/new" component={NewSessionForm} />
  </Router>
);

function _ensureLoggedIn(nextState, replace, callback) {

  if (CurrentUserStore.currentUserFetched()) {
    __redirectIfNotLoggedIn();
  }
  else {
    SessionsApiUtil.fetchCurrentUser(__redirectIfNotLoggedIn);
  }

  function __redirectIfNotLoggedIn () {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/session/new");
    }
    callback();
  }
};


document.addEventListener("DOMContentLoaded", function(e) {
  var root = document.getElementById("landing-content");
  ReactDOM.render(router, root);
});
