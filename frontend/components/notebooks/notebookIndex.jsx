var React = require('react');
var NotebookStore = require('./../../stores/notebook');
var NotebookApiUtil = require('./../../util/notebooks_api_util');

var NotebookIndex = React.createClass({

  getInitialState: function() {
    return { notebooks: NotebookStore.all(), show: false };
  },

  componentDidMount: function() {
    this.listenerToken = NotebookStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ notebooks: NotebookStore.all(), show: true });
  },

  //props - show(true/false)


  render: function() {
    var notebooks = "";
    var classes = "notebook-list"
    if (this.state.show === false) {
      classes += " hide";
    }

    if (this.state.notebooks.length > 0) {
      notebooks = this.state.notebooks.map(function(notebook){
        return <p>{notebook.title}</p>;
      }.bind(this));
    }

    //onClick of NotebookIndexItem, display Notes from that notebook
    return (
      <div className={classes}>
        {notebooks}
      </div>
    );
  }
});

module.exports = NotebookIndex;
