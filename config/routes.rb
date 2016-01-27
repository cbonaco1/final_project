Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :index, :show]
  resource :session, only: [:new, :create, :destroy]
end