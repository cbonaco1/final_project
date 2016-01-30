class Api::UsersController < ApplicationController

  def create
    # @user = User.new(username: params[:username], password: params[:password])
    @user = User.new(user_params)

    if @user.save
      sign_in_user(@user)
      render "api/users/new"
    else
      render json: ["Please fill out form better"]
    end
  end


  private
  def user_params
    params.permit(:username, :password)
  end

end
