class CreateNotebooks < ActiveRecord::Migration
  def change
    create_table :notebooks do |t|
      t.integer :author_id, null: false
      t.text :title
      t.text :description
    end

    add_index :notebooks, :author_id
  end
end
