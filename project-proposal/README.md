# FeatherNote

## Minimum Viable Product

FeatherNote is a web application inspired by Evernote built using Ruby on Rails
and React.js. FeatherNote allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Log in through Facebook
- [ ] Create, view, and edit notes
- [ ] Create Notebooks to organize notes
- [ ] Search for notes, filter search by either note content or notebook title


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/wireframes
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (1.5 days)
In Phase 1, I will implement the features related to user authentication.
This includes allowing users to create a new account (sign up), as well
as sign in. I will use the BCrypt gem in this phase. For this phase, when the user
logs in, I will bring them to a standard landing page, displaying just their username.
I will also provide a way for a user to log out.

[Details][phase-one]


### Phase 2: Flux Architecture and Note CRUD (2.5 days)
In this phase, I will set up the basic Flux architecture for the application,
a layout of the React components, and the React router. To complete this phase,
the Flux architecture will include an ApiUtil, NoteStore, and NoteActions. The React
components include a NoteIndex, NoteIndexItem, and NoteForm. In order to
style and edit a note, I will use the Summernote plugin. I will also create
a Note model, and a NotesController in order to perform CRUD operations
at the database level. For the front-end, I will display a list of the
logged-in user's notes on the landing page.

[Details][phase-two]


### Phase 3: Notebooks (1.5 days)
In this phase, I will focus on providing the user a way to create and view Notebooks,
to which they can add Notes. Each Note belongs to one Notebook. There will
be a "First Notebook" created by default for new users.
I will first create a Notebook model and controller, and then React components.
Components include NotebookIndex, and NotebookIndexItem.
For the Flux architecture, I will create a NotebookStore, and NotebookActions.
Once these steps have been completed, I will focus on the front-end of this phase.
This includes providing a form to the user to add a Notebook, and displaying
the list of all Notebooks. When a Notebook is selected, all Notes for that
Notebook will be shown.

[Details][phase-three]


### Phase 4: Sidebar (1.5 days)
With two of the main pieces of the application implemented (Notes and Notebooks),
Phase 4 will add the Sidebar component, which holds icons and widgets
the user can use to navigate different parts of the application. The Sidebar
will be visible at all times to allow the user to quickly get from one part
of the application to another. I can add icons provided by Bootstrap to the Sidebar.
I will need an icon for adding a note, searching notes, viewing Notes, Notebooks,
and Tags, and logging out. This section will be one React component.

[Details][phase-four]


### Phase 5: Tags and Taggings (1.5 days)
Phase 5 will focus on creating and deleting Tags, and allowing a user
to add Tag(s) to a note. A note can have zero or more tags associated with it.
The models needed are Tag and Tagging, and controllers will be TagsController
and TaggingsController. I will create TagIndex and TagIndexItem React components.
When viewing all Tags, clicking a Tag will show all Notes that have
that Tag, grouped by Notebook.

[Details][phase-five]


### Phase 6: Search (2 days)
This phase adds the ability for users to search through notes.
Users can filter their search by note content, tag, or notebook.
On the front-end, I will add a dropdown for Tag and Notebook, so the user
can search for content and filter by Tag and/or Notebook. There will be
one React component (Search), and the results of the search will
each be instances of the NoteIndexItem component.

[Details][phase-six]


### Bonus Features (TBD)
- [ ] Make CSS media queries to make site responsive to mobile devices
- [ ] Use the Twitter API to allow users to log in using Twitter account, and turn a note into a tweet

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
