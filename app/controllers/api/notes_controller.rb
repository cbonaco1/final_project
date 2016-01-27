class Api::NotesController < ApplicationController
  before_action :signed_in?

  def index
    #Note: only get the current user's notes
    @notes = Note.where(author_id: current_user.id)
  end
end
