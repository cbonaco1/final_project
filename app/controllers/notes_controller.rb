class NotesController < ApplicationController
  before_action :signed_in?

  def index
    # byebug
    #Note: only get the current user's notes
    @notes = Note.where(author_id: current_user.id)
    render json: @notes
  end
end
