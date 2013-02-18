Startupmap::Application.routes.draw do

	root :to => 'home#index'

	#match '/users_index/' => 'home#show_users'

  

  #match '/show_user/' => 'home#show_user'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users do
  	resources :players
  end

end
