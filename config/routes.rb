Rails.application.routes.draw do
  root to: 'home#index'
  
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :ideas,  only: [:index, :create, :destroy, :update]
    end
  end
end
