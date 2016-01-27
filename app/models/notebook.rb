class Notebook < ActiveRecord::Base
  validates :author_id, presence: true

  belongs_to(
    :author,
    :class_name => 'User',
    :foreign_key => :author_id,
    :primary_key => :id
  )

  has_many :notes

end
