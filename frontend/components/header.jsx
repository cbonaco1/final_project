var React = require('react');
var CurrentUserStore = require('./../stores/currentUserStore');

//Renders info about the logged in user --> "Logged in as:--",
//and also log in/out button
var Header = React.createClass({
  getInitialState: function() {
    return { currentUser: CurrentUserStore.currentUser() };
  },

  componentDidMount: function() {
    CurrentUserStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({currentUser: CurrentUserStore.currentUser() });
  },

  logout: function() {
    console.log("Log out!");
  },

  render: function() {
    //if !!_currentUser.id
    if (CurrentUserStore.isLoggedIn()) {
      return(
        <div>
          Logged in as: {this.state.currentUser.username}
          <button className="log-out-button" onClick={this.logout}>LOG OUT</button>
        </div>
      );
    }
    else {
      return (
        <div>
          <p>No one is logged in</p>
          <a href="#/session/new">Sign In</a>
        </div>
      );
    }
  }
});

module.exports = Header;
