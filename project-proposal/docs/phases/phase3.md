# Phase 3: Notebooks (1.5 days)

## Rails
### Models
* Notebook

### Controllers
* Api::NotebooksController (create, destroy, index, show, update)

### Views
* notebooks/index.json.jbuilder
* notebooks/show.json.jbuilder

## Flux
### Views (React Components)
* NotebooksIndex
  - NotebookIndexItem
* NotebookForm

### Stores
* Notebook

### Actions
* NotebookActions.fetchAllNotebooks
* NotebookActions.fetchSingleNotebook
* NotebookActions.createNotebook
* NotebookActions.editNotebook

### ApiUtil
* ApiUtil.fetchAllNotebooks
* ApiUtil.fetchSingleNotebook
* ApiUtil.createNotebook
* ApiUtil.editNotebook
* ApiUtil.destroyNotebook

## Gems/Libraries
* Bootstrap
