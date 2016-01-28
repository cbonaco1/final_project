Rails.application.routes.draw do
  root to: 'static_pages#landing'

  namespace :api, defaults: {format: :json} do
    resources :notes, only: [:index, :show]
  end

  resources :users, only: [:new, :create, :index, :show]
  resource :session, only: [:new, :create, :destroy]

end
