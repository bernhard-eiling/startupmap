class AddLatAndLngToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :lat, :float
    add_column :players, :lng, :float
  end
end
