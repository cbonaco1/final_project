Rails.application.routes.draw do
  root to: 'static_pages#landing'

  resources :users, only: [:new, :create, :index, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show]
    resources :notes, only: [:index, :show]
    resource :session, only: [:new, :create, :destroy, :show]
  end


end
