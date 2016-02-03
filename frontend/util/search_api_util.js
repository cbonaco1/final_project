var SearchActions = require('../actions/searchActions');

var SearchApiUtil = {

  search: function (query, page) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query, page: page},
      success: function (data) {
        
        SearchActions.receiveResults(data);
      },
      error: function(data) {
        debugger
      }
    });
  },

};


module.exports = SearchApiUtil;
