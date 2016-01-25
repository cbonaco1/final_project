# Phase 5: Tags and Taggings(1 day)

## Rails
### Models
* Tag
* Tagging
### Controllers
* TagsController (index, create)
* TaggingsController (create, update, destroy)

### Views
* Tag:index
* Tag:create

## Flux
### Views (React Components)
* TagIndex
* TagIndexItem

### Stores
TagStore

### Actions
* TagActions.receiveTags()
* TagActions.receiveTag(tag)
* TagActions.createTag(tag)
* TagActions.editTag(tag)
* TagActions.deleteTag(tag)

### ApiUtil
* ApiUtil.fetchTags()
* ApiUtil.fetchTag(id)
* ApiUtil.createTag(tag)
* ApiUtil.editTag(tag)
* ApiUtil.deleteTag(tag)

## Gems/Libraries
* Bootstrap
