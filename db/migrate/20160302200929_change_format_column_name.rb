class ChangeFormatColumnName < ActiveRecord::Migration
  def change
    remove_column :notes, :format, :string
    add_column :notes, :formatting, :string
  end
end
