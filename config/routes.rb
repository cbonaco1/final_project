Rails.application.routes.draw do
  root to: 'static_pages#landing'

  resource :session, only: [:new, :create, :destroy]
  # resources :users, only: [:new, :create, :index, :show]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :create]
    resources :notes, only: [:index, :show]
    resource :session, only: [:new, :create, :destroy, :show]
  end


end
