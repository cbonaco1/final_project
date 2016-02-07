class Api::NotesController < ApplicationController
  before_action :signed_in?

  def index
    #Note: only get the current user's notes
    @notes = Note.where(author_id: current_user.id).order(updated_at: :desc)
  end

  #This retrieves all of the current users notes for a notebook
  def notebook_notes
    @notes = Note.where(author_id: current_user.id,
                        notebook_id: params[:notebook_id])
                        .order(updated_at: :desc)
    # byebug
    render 'api/notes/index'

  end

  def show
    #should this render show view?
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
    params.permit(:author_id, :notebook_id, :title, :body)
  end
end
