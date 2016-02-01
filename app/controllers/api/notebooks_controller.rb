class Api::NotebooksController < ApplicationController
  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render 'api/notebooks/new'
    else
      render json: ["Error creating notebook"]
    end
  end

  def index
    #get notebooks where author_id == current_user.id
  end


  private
  def notebook_params
    params.permit(:author_id, :title, :description)
  end
end
