class Api::NotesController < ApplicationController
  before_action :signed_in?

  def index
    #Note: only get the current user's notes
    # byebug
    #note_params is saying params[:note_order] is not permitted, even tho it is in permit method
    @notes = Note.where(author_id: current_user.id).order(params[:note_order])
  end

  #This retrieves all of the current users notes for a notebook
  def notebook_notes
    @notes = Note.where(author_id: current_user.id,
                        notebook_id: params[:notebook_id])
                        .order(updated_at: :desc)

    render 'api/notes/index'
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

  def update
    @note = Note.find(params[:id])
    if @note.update!(note_params)
      render 'api/notes/show'
    else
      render json: ["Error updating note"]
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    @notes = Note.where(author_id: current_user.id).order(updated_at: :desc)
    render 'api/notes/index'
  end

  private
  def note_params
    params.permit(:author_id, :notebook_id, :title, :body, :formatting, :note_order)
  end
end
