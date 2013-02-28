class Player < ActiveRecord::Base
	attr_accessible :city, :description, :name, :postalcode, :street, :kind, :lat, :lng

	belongs_to :user
end