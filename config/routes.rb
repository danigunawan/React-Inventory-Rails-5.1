Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :containers
  resources :items

  scope module: :paginates do
    resources :paginated_containers, only: :index
  end

  root to: 'containers#index'
end
