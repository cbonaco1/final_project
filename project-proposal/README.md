# FeatherNote

## Minimum Viable Product

FeatherNote is a web application inspired by Evernote built using Ruby on Rails
and React.js. FeatherNote allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, view, and edit notes
- [ ] Create Notebooks to organize notes
- [ ] Create and delete tags
- [ ] Assign zero or more tags to a note
- [ ] Search for notes, filter search by either note content, tag, or notebook


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Note Model and JSON API (1.5 days)
In Phase 1, I will implement the features related to user authentication.
This includes allowing users to create a new account (sign up), as well
as sign in. I will use the BCrypt gem in this phase. For this phase, when the user
logs in, I will bring them to a standard landing page, displaying all of their notes.
I will also provide a way for a user to log out.

[Details][phase-one]

### Phase 2: Flux Architecture and Note CRUD (2.5 days)
In this phase, I will set up the basic Flux architecture for the application,
a layout of the React components, and the React router. To complete this phase,
the Flux architecture will include an ApiUtil, NoteStore, and NoteActions. The React
components include a NoteIndex, NoteIndexItem, and NoteForm. In order to
style and edit a note, I will use the Summernote plugin. I will also create
a Note model, and a NotesController in order to perform CRUD operations
at the database level.

https://mindmup.github.io/bootstrap-wysiwyg/

[Details][phase-two]

### Phase 3: Notebooks and Tags (2 days)



[Details][phase-three]

### Phase 4: Allow Complex Styling in Notes (1 day)

[Details][phase-four]

### Phase 5: Reminders and Garbage Collection (1 day)


[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)


### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Make CSS media queries to make site adaptable to mobile devices

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
