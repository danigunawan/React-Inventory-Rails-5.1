class CreateContainers < ActiveRecord::Migration[5.1]
  def change
    create_table :containers do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
