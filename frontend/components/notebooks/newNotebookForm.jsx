var React = require('react');
var CurrentUserStore = require('./../../stores/currentUserStore');
var NotebookApiUtil = require('./../../util/notebooks_api_util');

var NewNotebookForm = React.createClass({

  getInitialState: function() {
    var currentUser = CurrentUserStore.currentUser();
    return( {notebook: {author_id: currentUser.id } });
  },

  updateTitle: function(e) {
    var newTitle = e.target.value;
    var currentNotebook = this.state.notebook;
    currentNotebook["title"] = newTitle;
    this.setState(currentNotebook);
  },

  updateDescription: function(e) {
    var newDesc = e.target.value;
    var currentNotebook = this.state.notebook;
    currentNotebook["description"] = newDesc;
    this.setState(currentNotebook);
  },

  addNotebook: function() {
    NotebookApiUtil.createNotebook(this.state.notebook, this.props.callback);
  },

  render: function() {
    var notebook = this.state.notebook;
    var title = "";
    var description = "";

    if (notebook) {
      title = notebook.title;
      description = notebook.description;
    }

    return(
      <div className="modal-outline new-notebook-outline">
        <div className="notebook-form">
          <h3 className="new-note-header">Create Notebook</h3>

          <input type="text" value={title}
                  className="new-notebook-input notebook-title-field"
                  placeholder="Title Your Notebook..."
                  onChange={this.updateTitle}
                  autoFocus
                    />

          <input type="text" value={description} className=""
                  className="new-notebook-input notebook-description-field"
                  placeholder="Optional description..."
                  onChange={this.updateDescription}
                    />
          <div className="group">
            <button className="cancel-button note-cancel-button form-button" onClick={this.props.callback}>Cancel</button>
            <button className="form-button note-add-button" onClick={this.addNotebook}>Create Notebook</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NewNotebookForm;
