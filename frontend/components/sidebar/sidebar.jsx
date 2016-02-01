var React = require('react');

var Sidebar = React.createClass({

  showNotes: function() {
    //Show ALL notes, ordered by date
  },

  showNotebooks: function() {
    //Display list of users notebooks
    //When user clicks on a notebook,
    //display all notes just for that notebook
  },

  render: function() {
    return (
      <div className="sidebar-component">
        <ul className="sidebar-component-list">
          <li onClick={this.showNotes}>
            Notes
          </li>
          <li>Notebooks</li>
          <li>Tags</li>
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
