class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username], params[:user][:password]
    )
    if user
      sign_in_user(user)
      redirect_to user_url(user)
    else
      flash.now[:errors] = ["Incorrect Username/Password"]
      render :new
    end
  end

  def destroy
    sign_out_user(current_user)
    redirect_to new_session_url
  end
end
