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
    @notebooks = Notebook.where(author_id: current_user.id)
    #get notebooks where author_id == current_user.id
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
    @notebooks = Notebook.where(author_id: current_user.id)
    render 'api/notebooks/index'
  end


  private
  def notebook_params
    params.permit(:author_id, :title, :description)
  end
end
