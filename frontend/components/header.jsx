var React = require('react');
var CurrentUserStore = require('./../stores/currentUserStore');
var SessionsApiUtil = require('./../util/session_api_util');

var History = require('react-router').History;

//Renders info about the logged in user --> "Logged in as:--",
//and also log in/out button
var Header = React.createClass({

  mixins: [History],

  getInitialState: function() {
    return { currentUser: CurrentUserStore.currentUser() };
  },

  componentDidMount: function() {
    this.listenerToken = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _onChange: function() {
    this.setState({currentUser: CurrentUserStore.currentUser() });
  },

  logout: function() {
    //Redirect to login page after sign out
    SessionsApiUtil.logout(function(){
      this.history.pushState(null, "/session/new");
    }.bind(this));
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
