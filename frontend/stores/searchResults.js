var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');

var _searchResults = [];
var _meta = {};

var SearchResultsStore = new Store(AppDispatcher);


SearchResultsStore.all = function () {
  return _searchResults.slice();
};

SearchResultsStore.meta = function () {
  return _meta;
};

SearchResultsStore.reset = function() {
  _searchResults = [];
  _meta = {};
};

SearchResultsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case "RECEIVE_SEARCH_RESULTS":
      _searchResults = payload.searchResults;
      _meta = payload.meta;
      SearchResultsStore.__emitChange();
      break;

  }
};


module.exports = SearchResultsStore;
