var React = require('react');
var NotebookStore = require('./../../stores/notebook');
var NotebookApiUtil = require('./../../util/notebooks_api_util');
var NotebookIndexItem = require('./notebookIndexItem');

var NotebookIndex = React.createClass({

  getInitialState: function() {
    return { notebooks: NotebookStore.all() };
  },

  componentDidMount: function() {
    this.listenerToken = NotebookStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _onChange: function() {
    this.setState({ notebooks: NotebookStore.all() });
  },

  render: function() {
    var notebooks = "";
    var classes = "notebook-list"
    // if (this.state.show === false) {
    //   classes += " hide";
    // }

    if (this.state.notebooks.length > 0) {
      notebooks = this.state.notebooks.map(function(notebook){
        return <NotebookIndexItem key={notebook.id}
                                  notebook={notebook}
                                  callback={this.props.callback} />;
      }.bind(this));
    }

    //add text input for adding a new notebook
    return (
      <div className="note-form-outline">
        <div className={classes}>
          <div className="notebook-header group">
            <h3 className="notebook-header-title">Notebooks</h3>
            <i className="fa fa-plus-circle fa-2x sidebar-icon add-notebook"></i>
          </div>
          <ul className="notebook-list-items">
            {notebooks}
          </ul>
          <button className="form-button" onClick={this.props.callback}>Close</button>
        </div>
      </div>
    );
  }
});

module.exports = NotebookIndex;
