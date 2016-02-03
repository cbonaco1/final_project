var React = require('react');

var Toolbar = React.createClass({

  //this.props.updateNotebook
  //this.props.updateNoteTitle
  //this.props.updateNoteBody

  //this.props.notebooks

  //this.props.editor

  render: function() {
    return (
      <div className="toolbar">
        <div className="ql-format-group">
          <button className="ql-bold ql-format-button"></button>
          <button className="ql-italic ql-format-button"></button>
          <button className="ql-underline ql-format-button"></button>
        </div>
        <select className="ql-size">
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

        <button className="ql-image ql-format-button"></button>

        <select className="notebook-dropdown" value={this.props.selectedNotebook} onChange={this.props.notebookChange}>
          {this.props.notebooks}
        </select>

        <i id="editor-save-icon" className="fa fa-floppy-o sidebar-icon" onClick={this.props.updateNote}></i>

      </div>
    );
  }
});

module.exports = Toolbar;
