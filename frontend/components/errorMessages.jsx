var React = require('react');
var ErrorStore = require('./../stores/errors');

var ErrorMessages = React.createClass({

  getInitialState: function() {
    return { messages: ErrorStore.getMessages() };
  },

  //listen to ErrorStore
  //should this be another lifecycle method?
  componentDidMount: function() {
    this.listenerToken = ErrorStore.addListener(this.showErrors);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  showErrors: function() {
    this.setState({ messages: ErrorStore.getMessages() });
  },


  render: function() {
    var msgs = [];
    var className = "error-msgs";
    if (this.state.messages.length === 0) {
      className += " hide";
    }
    msgs = this.state.messages.map(function(error, index){
      return <p key={index}>{error}</p>;
    });
    return (
      <div className={className}>
        {msgs}
      </div>
    );
  }
});

module.exports = ErrorMessages;
