# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
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

user3 = User.new(username: "johnsmith")
user3.password = "password"
user3.reset_session_token!
