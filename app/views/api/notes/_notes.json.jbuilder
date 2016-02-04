json.extract! note, :id, :title, :body, :updated_at
json.notebook note.notebook
json.author do
  # json.partial! 'api/users/users', user: note.author
  json.id note.author.id
  json.username note.author.username
  json.notebooks note.author.notebooks do |notebook|
    json.id notebook.id
    json.title notebook.title
  end
end
