var React = require('react');
var NotebookStore = require('./../stores/notebook');
var NotebookApiUtil = require('./../util/notebooks_api_util');

var Toolbar = React.createClass({

  getInitialState: function() {
    return( {notebooks: NotebookStore.all() } );
  },

  componentWillMount: function() {
    this.listenerToken = NotebookStore.addListener(this._onChange);
    NotebookApiUtil.fetchCurrentUserNotebooks();
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _onChange: function() {
    this.setState( {notebooks: NotebookStore.all() } );
  },

  render: function() {
    var notebookDropdownOptions = "";

    if (this.state.notebooks.length > 0) {
      notebookDropdownOptions = this.state.notebooks.map(function(notebook, index){
        return <option key={notebook.id} value={notebook.id}>{notebook.title}</option>;
      }.bind(this));
    }

    //TODO style dropdown options
    //NOTE React gives a warning that we set value of the font-size
    //dropdown without giving it a onChange event
    return (
      <div className="toolbar">
        <div className="ql-format-group">
          <button className="ql-bold ql-format-button"></button>
          <button className="ql-italic ql-format-button"></button>
          <button className="ql-underline ql-format-button"></button>
        </div>
        <select className="ql-size" value="18px">
          <option value="10px">Small</option>
          <option value="13px">Normal</option>
          <option value="18px">Large</option>
          <option value="32px">Huge</option>
        </select>
        <select title="Text Color" className="ql-color">
          <option value="rgb(255, 255, 255)"></option>
          <option value="rgb(0, 0, 0)"></option>
          <option value="rgb(255, 0, 0)"></option>
          <option value="rgb(0, 0, 255)"></option>
          <option value="rgb(0, 255, 0)"></option>
          <option value="rgb(0, 128, 128)"></option>
          <option value="rgb(255, 0, 255)"></option>
          <option value="rgb(255, 255, 0)"></option>
        </select>

        <select className="notebook-dropdown" value={this.props.selectedNotebook} onChange={this.props.notebookChange}>
          {notebookDropdownOptions}
        </select>

        <i id="editor-save-icon" className="fa fa-floppy-o sidebar-icon" onClick={this.props.updateNote}></i>

      </div>
    );
  }
});

module.exports = Toolbar;
