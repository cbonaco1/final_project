var React = require('react');
var NotificiationStore = require('./../stores/notifications');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var Notificiations = React.createClass({

  getInitialState: function() {
    return { messages: NotificiationStore.getMessages() };
  },

  //invoked only once after initial render
  componentDidMount: function() {
    this.listenerToken = NotificiationStore.addListener(this.showMessages);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  showMessages: function() {
    this.setState({ messages: NotificiationStore.getMessages() });
  },

  hideMessages: function() {
    this.setState({ messages: NotificiationStore.clearMessages() });
  },

  render: function() {

    //after rendered with messages, call setState again on an interval,
    //and set messages to []

    //iterate through this.state.messages
    var messages;
    var classes = "notifications-container";

    if (this.state.messages.length > 0) {

      //Clear messages after 3 seconds
      window.setTimeout(function(){
        this.hideMessages();
      }.bind(this), 3000);

      messages = this.state.messages.map(function(message, index){
        return <p key={index}>{message}</p>
      });
    }
    else {
      classes += " hide";
    }

    return(
      <div className={classes}>
        { messages }
        </div>
    );
  }
});

module.exports = Notificiations;
