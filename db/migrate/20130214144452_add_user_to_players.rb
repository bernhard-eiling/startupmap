class AddUserToPlayers < ActiveRecord::Migration
  def change
  	add_column :players, :user_id, :integer
  	add_index :players, :user_id
  end
end
