class StaticPagesController < ApplicationController
  before_filter :signed_in?, only: [:root]

  #want this to be container for application
  def root
  end

  #landing for welcome page
  def landing
  end
end
