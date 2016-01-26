var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var History = ReactRouter.History;

var NewUserForm = require('./components/user/newUserForm');

var App = React.createClass({
  render: function() {
    return(
      <div>
        <header>
          <h1>Welcome to FeaterNote!</h1>
          <p>FeatherNote is a note-taking application designed
          to simplify a way for you to organize your notes and
        simplify your life!</p>
      <p>FeatherNote is inspired by Evernote and is written on the Rails
      webframework using React.js</p>
        </header>
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    
  </Route>
);
