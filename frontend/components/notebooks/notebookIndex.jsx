var React = require('react');
var NotebookStore = require('./../../stores/notebook');
var NotebookApiUtil = require('./../../util/notebooks_api_util');
var NotebookIndexItem = require('./notebookIndexItem');
var NewNotebookForm = require('./newNotebookForm');

var NotebookIndex = React.createClass({

  getInitialState: function() {
    return { notebooks: NotebookStore.all(), showNotebookModal: false };
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

  toggleNotebookModal: function() {
    var newState = !this.state.showNotebookModal;
    this.setState({showNotebookModal: newState});
  },

  render: function() {
    var notebooks = "";
    var classes = "notebook-list";
    var notebookModal;

    if (this.state.notebooks.length > 0) {
      notebooks = this.state.notebooks.map(function(notebook){
        return <NotebookIndexItem key={notebook.id}
                                  notebook={notebook}
                                  callback={this.props.callback} />;
      }.bind(this));
    }

    if (this.state.showNotebookModal) {
      notebookModal = <NewNotebookForm callback={this.toggleNotebookModal} />;
    }

    //TODO do not show delete option if number of notebooks === 1
    return (
      <div className="modal-outline">
        <div className={classes}>
          <div className="notebook-header group">
            <h3 className="notebook-header-title">Notebooks</h3>
            <i className="fa fa-plus-circle fa-2x sidebar-icon add-notebook"
                onClick={this.toggleNotebookModal}></i>
          </div>
          <ul className="notebook-list-items">
            {notebooks}
          </ul>
          <button className="form-button" onClick={this.props.callback}>Close</button>
        </div>
        {notebookModal}
      </div>
    );
  }
});

module.exports = NotebookIndex;
