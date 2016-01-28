var React = require('react');
var NotesIndex = require('./notes/notesIndex');

var App = React.createClass({
  //eventually this will also render the sidebar and other stuff
  //NoteDetail might be other component to render
  //sine both are side by side and NoteDetail is always present on right
  render: function() {
    return(

      <NotesIndex />
    );
  }
});

module.exports = App;
