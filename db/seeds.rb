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
guest_notebook = Notebook.create!(author_id: guest_user.id, title:"First Notebook")
cb_notebook = Notebook.create!(author_id: user1.id, title:"CB First Notebook")
cb_notebook2 = Notebook.create!(author_id: user1.id, title:"CB App Academy Notebook")
cb_notebook3 = Notebook.create!(author_id: user1.id, title:"Sample CB Notebook")
yoda_notebook = Notebook.create!(author_id: user2.id, title: "Yoda's Notebook", description: "Notes from Jedi training")
yoda_other_notebook = Notebook.create!(author_id: user2.id, title: "Yoda's Personal Notebook", description: "Personal stuff")
john_notebook = Notebook.create!(author_id: user3.id)


Note.destroy_all
guest_note1 = Note.create!(author_id: guest_user.id,
                            title:"Welcome to FeatherNote!",
body:"FeatherNote allows you to store meaningful notes in order to simplify your life!",
                            notebook_id: guest_notebook.id)

guest_note2 = Note.create!(author_id: guest_user.id,
                            title:"Instructions",
body:"Add a Note by clicking the plus sign in the top left. Notes can be edited in the text editor, and deleted by clicking the garbage can",
                            notebook_id: guest_notebook.id)

note1 = Note.create!(author_id: user1.id, title:"Christian's Note", body:"This is my first note", notebook_id: cb_notebook.id)
note2 = Note.create!(author_id: user1.id, title:"Reminder", body:"Take out the trash", notebook_id: cb_notebook.id)
note2a = Note.create!(author_id: user1.id, title:"App Academy Project", body:"Make a sweet application", notebook_id: cb_notebook2.id)
note2b = Note.create!(author_id: user1.id, body:"No titled note...", notebook_id: cb_notebook3.id)
note2c = Note.create!(author_id: user1.id, title:"AA Note", notebook_id: cb_notebook2.id)
note2d = Note.create!(author_id: user1.id, body:"Fix Bug!!", notebook_id: cb_notebook2.id)

note3 = Note.create!(author_id: user2.id, title:"Yoda's Note", body:"A note by Yoda", notebook_id: yoda_notebook.id)
note3a = Note.create!(author_id: user2.id, body:"Do or do not, there is no try", notebook_id: yoda_notebook.id)
note3b = Note.create!(author_id: user2.id, title: "Training", body:"Keep training Luke", notebook_id: yoda_notebook.id)
note3c = Note.create!(author_id: user2.id, title: "Reminder", body:"Pickup light saber from store", notebook_id: yoda_other_notebook.id)
note3c = Note.create!(author_id: user2.id, body:"Is useful, this app", notebook_id: yoda_other_notebook.id)
note4 = Note.create!(author_id: user2.id, title:"No body, this note has", notebook_id: yoda_notebook.id)

note5 = Note.create!(author_id: user3.id, title:"John's reminder", body: "Not sure what I was supposed to remind myself", notebook_id: john_notebook.id)
