var React = require('react');
var SearchResultsStore = require('./../stores/searchResults');
var SearchApiUtil = require('./../util/search_api_util');
var NoteIndexItem = require('./notes/notesIndexItem');
var NotebookIndexItem = require('./notebooks/notebookIndexItem');

var Search = React.createClass({

  getInitialState: function () {
    return {page: 1, query: ""};
  },

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

  clearResults: function() {
    SearchResultsStore.reset();
    this.props.callback();
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
          <input type="text" className="search-input"
                  placeholder="search notes..."
                  onKeyUp={ this.search }
                  autoFocus />

          <div className="search-nav group">
            <p>
              Displaying {SearchResultsStore.all().length} of {SearchResultsStore.meta().totalCount}
            </p>
            <button className="next-page-button" onClick={this.nextPage}>Next ></button>
          </div>
          <ul className="search-results">{ searchResults }</ul>
          <button className="form-button" onClick={this.clearResults}>Close</button>
        </div>
      </div>
    );
  }
});

module.exports = Search;
