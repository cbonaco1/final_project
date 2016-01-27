var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var NoteStore = new Store(Dispatcher);

var _notes = {};

NoteStore.all = function() {
  return _notes;
}

//may need to copy the objects into an array

module.exports = NoteStore;
