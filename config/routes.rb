Startupmap::Application.routes.draw do

	root :to => 'home#index'

	match 'placeMarker', :to => 'home#placeMarker'
	#match 'arrayquery/:kind', :to => 'home#arrayquery'
	#match 'arrayquery', :to => 'home#arrayquery'
	match 'searchPlayer/name=:name', :to => 'home#searchPlayer'

  #match '/show_user/' => 'home#show_user'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users do
  	resources :players
  end
end