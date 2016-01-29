class Api::SessionsController < ApplicationController
  def new
  end

  def show
    if current_user
      @user = current_user
      render "api/users/show" 
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if @user
      sign_in_user(@user)
      #instead of redirect_to api_notes_url
      render "api/users/show"
    else
      render json: ["Incorrect Username/Password"], status: 401
      # instead of flash[:errors]
    end
  end

  def destroy
  end
end
