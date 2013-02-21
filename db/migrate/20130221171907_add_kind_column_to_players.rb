class AddKindColumnToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :kind, :string
  end
end
