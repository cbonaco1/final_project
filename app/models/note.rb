class Note < ActiveRecord::Base
  validates :author_id, :notebook_id, presence: true

  belongs_to(
    :author,
    :class_name => 'User',
    :foreign_key => :author_id,
    :primary_key => :id
  )

  belongs_to :notebook
end
