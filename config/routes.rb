Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope module: :api, path: :api do
    resources :key_activities, only: [:index, :create, :update, :destroy]
    patch '/key_activities', to: "key_activities#resort"

    resources :users, only: [:index]
    get '/profile', to: 'users#profile'
  end

  root 'react_app#index'
  get "/*path", to: "react_app#index", format: false, constraints: -> (req) { !req.path.include?("/rails") }
end
