var React = require('react');
var NotesIndex = require('./notes/notesIndex');
var Header = require('./header');
var Sidebar = require('./sidebar/sidebar');
var Notifications = require('./notifications');

var App = React.createClass({

  render: function() {
    //put Notifications component here
    return(
      <div className="content-header group">
        <Notifications />
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
