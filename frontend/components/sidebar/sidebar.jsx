var React = require('react');
var NotebookIndex = require('./../notebooks/notebookIndex');
var NotebookApiUtil = require('./../../util/notebooks_api_util');

var Sidebar = React.createClass({

  showNotes: function() {
    //Show ALL notes, ordered by date
  },

  showNotebooks: function() {
    //Display list of users notebooks
    //When user clicks on a notebook,
    //display all notes just for that notebook
    NotebookApiUtil.fetchCurrentUserNotebooks();
  },

  render: function() {
    return (
      <div className="sidebar-component">
        <ul className="sidebar-component-list">
          <li className="sidebar-icons" onClick={this.showNotes}>
            <i className="fa fa-file fa-lg sidebar-icon"></i>
          </li>
          <li className="sidebar-icons" onClick={this.showNotebooks}>
            <i className="fa fa-book fa-lg sidebar-icon"></i>
            <NotebookIndex />
          </li>
          <li className="sidebar-icons">
            <i className="fa fa-tags fa-lg sidebar-icon"></i>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
