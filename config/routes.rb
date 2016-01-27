Rails.application.routes.draw do
  root to: 'static_pages#landing'

  resources :users, only: [:new, :create, :index, :show]
  resource :session, only: [:new, :create, :destroy]

  resources :notes, only: [:index, :show]
end
