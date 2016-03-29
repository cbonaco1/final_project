class Api::SessionsController < ApplicationController

  # before_action :seed_data, :only => :create

  def new
  end

  # used by fetchCurrentUser
  def show
    if current_user
      @user = current_user

      #returns the JSON of the current user
      render "api/users/show"
    else
      render json: {}
    end
  end

  #used by login
  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if @user
      sign_in_user(@user)

      #re-seed data if user is guest user
      if @user.username == "guest"
        @user.set_up_user
      end

      #returns the JSON of the new user
      render "api/users/show"
    else
      render json: ["Incorrect Username/Password"], status: 401
      # instead of flash[:errors]
    end
  end

  #used by logout
  def destroy
    sign_out_user(current_user)
    render json: {}
  end

end
