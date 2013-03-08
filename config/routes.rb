Startupmap::Application.routes.draw do

	root :to => 'home#index'

	match 'getCity/city=:city', :to => 'home#getCity'
	match 'getKind/kind=:kind/city=:city', :to => 'home#getKind'

  #match '/show_user/' => 'home#show_user'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users do
  	resources :players
  end

end
