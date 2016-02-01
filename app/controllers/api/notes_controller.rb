class Api::NotesController < ApplicationController
  before_action :signed_in?

  def index
    #Note: only get the current user's notes
    @notes = Note.where(author_id: current_user.id).order(updated_at: :asc)
  end

  def show
    @note = Note.find(params[:id])
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render 'api/notes/show'
    else
      render json: ["Error creating note"]
    end
  end

  private
  def note_params
    params.permit(:author_id, :notebook_id, :title, :body)
  end
end
