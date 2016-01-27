# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or newd alongside the db with db:setup).
#
# Examples:
#
#   cities = City.new([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.destroy_all
guest_user = User.new(username: "guest")
guest_user.password = "guestpassword"
guest_user.reset_session_token!

user1 = User.new(username: "christian")
user1.password = "password"
user1.reset_session_token!

user2 = User.new(username: "yoda")
user2.password = "password"
user2.reset_session_token!

user3 = User.new(username: "john")
user3.password = "password"
user3.reset_session_token!

Notebook.destroy_all
cb_notebook = Notebook.create!(author_id: user1.id, title:"CB First Notebook")
yoda_notebook = Notebook.create!(author_id: user2.id, title: "Yoda's Notebook", description: "Notes from Jedi training")
john_notebook = Notebook.create!(author_id: user3.id)


Note.destroy_all
note1 = Note.create!(author_id: user1.id, title:"Christian's Note", body:"This is my first note", notebook_id: cb_notebook.id)
note2 = Note.create!(author_id: user1.id, title:"Reminder", body:"Take out the trash", notebook_id: cb_notebook.id)

note3 = Note.create!(author_id: user2.id, title:"Yoda's Note", body:"A note by Yoda", notebook_id: yoda_notebook.id)

note4 = Note.create!(author_id: user2.id, body:"Unititled note by Yoda", notebook_id: yoda_notebook.id)

note5 = Note.create!(author_id: user3.id, title:"John's reminder", notebook_id: john_notebook.id)
