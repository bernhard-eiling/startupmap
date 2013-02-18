class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :street
      t.integer :postalcode
      t.string :city
      t.text :description

      t.timestamps
    end
  end
end
