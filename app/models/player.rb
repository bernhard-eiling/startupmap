class Player < ActiveRecord::Base
	attr_accessible :city, :description, :name, :postalcode, :street

	belongs_to :user
end