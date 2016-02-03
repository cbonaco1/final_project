var React = require('react');
var SearchResultsStore = require('./../stores/searchResults');
var SearchApiUtil = require('./../util/search_api_util');
var NoteIndexItem = require('./notes/notesIndexItem');
var NotebookIndexItem = require('./notebooks/notebookIndexItem');

var Search = React.createClass({
  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  //not sure what this does
  _onChange: function() {
    this.forceUpdate();
  },

  getInitialState: function () {
    return {page: 1, query: ""};
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);

    this.setState({page: 1, query: query});
  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);

    this.setState({page: nextPage});
  },


  render: function() {

    var searchResults = SearchResultsStore.all().map(function (searchResult) {
      if (searchResult._type === "Note") {
        return <NoteIndexItem note={searchResult} key={searchResult.id} />
      } else {
        return <NotebookIndexItem notebook={searchResult} key={searchResult.id}/>
      }
    });

    return (
      <div className="modal-outline">
        <div className="search-modal">
          <h1 className="search-title">search notes</h1>
          <input type="text" className="search-input"
                  placeholder="search notes..."
                  onKeyUp={ this.search }
                  autoFocus />
          Displaying {SearchResultsStore.all().length} of
          {SearchResultsStore.meta().totalCount}
          <button className="next-page-button" onClick={this.nextPage}>Next ></button>

          <ul className="users-index">{ searchResults }</ul>
          <button className="form-button" onClick={this.props.callback}>Close</button>
        </div>
      </div>
    );
  }
});

module.exports = Search;
