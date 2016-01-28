class AddTimestamps < ActiveRecord::Migration
  def change
    add_column(:notes, :created_at, :datetime)
    add_column(:notes, :updated_at, :datetime)

    add_column(:notebooks, :created_at, :datetime)
    add_column(:notebooks, :updated_at, :datetime)

    add_column(:users, :created_at, :datetime)
    add_column(:users, :updated_at, :datetime)
  end
end
