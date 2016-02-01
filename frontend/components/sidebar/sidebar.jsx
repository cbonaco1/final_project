var React = require('react');
var NotebookIndex = require('./../notebooks/notebookIndex');

var Sidebar = React.createClass({

  showNotes: function() {
    //Show ALL notes, ordered by date
  },

  showNotebooks: function() {
    //Display list of users notebooks
    //When user clicks on a notebook,
    //display all notes just for that notebook
    <NotebookIndex />
  },

  render: function() {
    return (
      <div className="sidebar-component">
        <ul className="sidebar-component-list">
          <li onClick={this.showNotes}>
            Notes
          </li>
          <li>
            <i class="fa fa-book fa-lg"></i>
          </li>
          <li>Tags</li>
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
