Rails.application.routes.draw do
  root to: 'static_pages#landing'

  resource :session, only: [:new, :create, :destroy]

  #this route comes from facebook, after they have validated the login
  get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'
  get 'auth/twitter/callback', to: 'sessions#omniauth_twitter'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :create]
    resources :notes, only: [:index, :show, :create, :update, :destroy]
    resources :notebooks, only: [:index, :show, :create, :destroy]
    get "notebooks/:notebook_id/notes", to: "notes#notebook_notes"
    resource :session, only: [:new, :create, :destroy, :show]
    get "search", to: "utils#search"
  end


end
