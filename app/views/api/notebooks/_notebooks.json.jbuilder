json.extract! notebook, :id, :author_id, :title, :description, :created_at
json.notes do
  json.partial! 'api/notes/notes', collection: notebook.notes, as: :note
end
