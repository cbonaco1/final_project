var React = require('react');
var NotebookStore = require('./../../stores/notebook');

var NotebookIndex = React.createClass({

  getInitialState: function() {
    return { notebooks: NotebookStore.all() };
  },

  componentDidMount: function() {
    this.listenerToken = NotebookStore.addListener(this._onChange);
    NotebookApiUtil.fetchUserNotebooks();
  },

  _onChange: function() {
    this.setState({ notebooks: NotebookStore.all() });
  },

  //props - show(true/false)

  //onClick of NotebookIndexItem, display Notes from that notebook

  render: function() {
    return (
      <div className="notebook-list">

      </div>
    );
  }
});

module.exports = NotebookIndex;
