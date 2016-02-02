json.extract! note, :id, :title, :body, :updated_at
json.notebook note.notebook
json.author do |author|
  json.id author.id
  json.username author.username
  json.notebooks note.author.notebooks do |notebook|
    json.id notebook.id
    json.title notebook.title
  end
end
