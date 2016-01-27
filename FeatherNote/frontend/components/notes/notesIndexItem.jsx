var React = require('react');

var NotesIndexItem = React.createClass({
  render: function() {
    <li>{this.props.notes.title}</li>;
  }
});

module.exports = NotesIndexItem;
