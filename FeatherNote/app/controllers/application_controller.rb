class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def sign_in_user(user)
    new_token = user.reset_session_token!
    session[:session_token] = new_token
  end

  def sign_out_user(user)
    user.reset_session_token!
    session[:session_token] = nil
  end

  def current_user
    User.find_by_session_token(session[:session_token])
  end
end
