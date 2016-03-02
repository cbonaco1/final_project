class AddFormatToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :format, :string
  end
end
