var AppDispatcher = require('./../dispatcher/dispatcher');

var SearchActions = {
  receiveResults: function (data) {
    AppDispatcher.dispatch({
      actionType: "RECEIVE_SEARCH_RESULTS",
      searchResults: data.results,
      meta: {totalCount: data.total_count}
    });
  },


};

module.exports = SearchActions;
