var React = require('react');
var NotesIndex = require('./notes/notesIndex');
var Header = require('./header');
var Sidebar = require('./sidebar/sidebar');

var App = React.createClass({
  //eventually this will also render the sidebar and other stuff
  //NoteDetail might be other component to render
  //sine both are side by side and NoteDetail is always present on right
  render: function() {
    return(
      <div className="content-header">
        <Sidebar />
        <div className="content-sidebar">
          <NotesIndex />
          <Header />
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
