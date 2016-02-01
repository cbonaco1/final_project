var React = require('react');
var NotebookStore = require('./../../stores/notebook');
var NotebookApiUtil = require('./../../util/notebooks_api_util');
var NotebookIndexItem = require('./notebookIndexItem');

var NotebookIndex = React.createClass({

  getInitialState: function() {
    return { notebooks: NotebookStore.all(), show: false };
  },

  componentDidMount: function() {
    this.listenerToken = NotebookStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _onChange: function() {
    this.setState({ notebooks: NotebookStore.all(), show: true });
  },

  render: function() {
    var notebooks = "";
    var classes = "notebook-list"
    if (this.state.show === false) {
      classes += " hide";
    }

    if (this.state.notebooks.length > 0) {
      notebooks = this.state.notebooks.map(function(notebook){
        return <NotebookIndexItem key={notebook.id} notebook={notebook} />;
      }.bind(this));
    }

    return (
      <div className={classes}>
        <ul className="notebook-list">
          {notebooks}
        </ul>
      </div>
    );
  }
});

module.exports = NotebookIndex;
