class AddPreferencesColumnToUser < ActiveRecord::Migration
  def change
    add_column :users, :preferences, :hash
  end
end
