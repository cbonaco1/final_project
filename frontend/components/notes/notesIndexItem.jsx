var React = require('react');

var NotesIndexItem = React.createClass({
  render: function() {
    return(
      <li>
        <div className="user-note">
          {this.props.note.title}
          {this.props.note.body}
        </div>
      </li>
    );
  }
});

module.exports = NotesIndexItem;
