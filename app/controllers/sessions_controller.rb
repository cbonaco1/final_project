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

      #api/notes/index - format is JSON
      redirect_to api_notes_url
    else
      flash.now[:errors] = ["Incorrect Username/Password"]
      render :new
    end
  end

  def destroy
    sign_out_user(current_user)
    redirect_to new_session_url
  end

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in_user(@user)
    redirect_to root_url + '#/notes'
  end

  def omniauth_twitter
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in_user(@user)
    redirect_to root_url + '#/notes'
  end

  private
  def auth_hash
    request.env['omniauth.auth']
  end



end
