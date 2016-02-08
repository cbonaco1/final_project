class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      #create new notebook and notes for new user
      @user.set_up_user
      sign_in_user(@user)
      render "api/users/new"
    else
      render json: @user.errors.full_messages, status: 400
    end
  end


  private
  def user_params
    params.permit(:username, :password)
  end

end
