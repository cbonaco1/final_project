var React = require('react');

var NotesIndexItem = React.createClass({
  render: function() {
    return(
      <li className="user-note" onClick="showNote">
        <div className="user-note-content">
          <h3>{this.props.note.title}</h3>
          <p>{this.props.note.body}</p>
        </div>
      </li>
    );
  }
});

module.exports = NotesIndexItem;
