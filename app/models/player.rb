class Player < ActiveRecord::Base
	attr_accessible :city, :description, :name, :postalcode, :street, :kind

	belongs_to :user
end