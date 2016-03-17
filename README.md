# FeatherNote

Welcome to the FeatherNote application! FeatherNote is a single-page web
application inspired by Evernote. This application is built using
the Rails web framework, as well as React.js. Give it a try <a href="http://feather-note.herokuapp.com/" target="_blank">here
</a>!

## Features
- [ ] Create an account
- [ ] Log in / Log out
- [ ] Log in through Facebook or Twitter
- [ ] Create, view, and edit notes
- [ ] Create Notebooks to organize notes
- [ ] Search for notes, filter search by either note content or notebook title

<a href="http://feather-note.herokuapp.com/" target="_blank">
  ![alt text][screenshot]
</a>

## Technologies
* Ruby (version 2.2.3)

* Rails (version 4.2.5)

* React.js ([docs](https://facebook.github.io/react/))

* Flux ([docs](https://facebook.github.io/flux/docs/overview.html))

* PostgreSQL

* BCrypt

* OmniAuth Facebook ([docs](https://github.com/mkdynamic/omniauth-facebook))

* OmniAuth Twitter ([docs](https://github.com/arunagw/omniauth-twitter))

* Twitter Developer API ([docs](https://dev.twitter.com/overview/documentation))

* Quill JS Text Editor ([docs](http://quilljs.com/docs/quickstart/))

Implementation timeline and other project documents including wireframes
can be viewed [here][docs].


## React/Flux
This application was built using the React.js front-end library, along with the Flux
design pattern. Using these two technologies together allows for UI components to be
rendered efficiently due to Reacts use of the virtual DOM, and the uni-directional
flow of data provided by the Flux pattern. The diagram below was taken from the Flux
documentation and explains the flow of data.

![alt text][flux-diagram]

Using Flux, actions are sent to a dispatcher. The dispatcher then notifies stores,
which contain data on a particular entity of the app (NoteStore for example).
Stores also have views (which are React components) listening to them for when to render.
A store will only let its views know to render based on the action it receives from the dispatcher.
Since these views already define how they will render, the stores let them know when to render
based on a action they are interested in.

### React/Flux in FeatherNote
React and Flux are both used throughout the FeatherNote application. This section
will explain how these technologies were used when creating a note.

1. User clicks Add Note button, sending an AJAX request to add the note to the database
2. The success callback of the AJAX request calls the action method to
let the dispatcher know that a note has been added
3. The dispatcher tells the stores that a note has been added
4. The NoteStore is interested in this event, so it updates itself to include the new note,
and then calls emitChange() to notify its listeners.
5. The NoteIndex React component (view) is listening to events on the NoteStore,
so once the NoteStore updates, the view re-renders to include the new note



[live-link]: http://feather-note.herokuapp.com/
[screenshot]: ./project-proposal/screenshots/feather-note-screenshot.png
[docs]: ./project-proposal/README.md
[flux-diagram]: ./project-proposal/screenshots/flux-screen-shot.png
