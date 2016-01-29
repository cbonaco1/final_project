var React = require('react');
var NotesIndex = require('./notes/notesIndex');
var Header = require('./header');

var App = React.createClass({
  //eventually this will also render the sidebar and other stuff
  //NoteDetail might be other component to render
  //sine both are side by side and NoteDetail is always present on right
  render: function() {
    return(
      <div>
        <Header />
        <NotesIndex />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
