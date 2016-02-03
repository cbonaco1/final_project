class Notebook < ActiveRecord::Base
  #only include results if they belong to the current user?
  include PgSearch
  multisearchable :against => [:title, :description]

  validates :author_id, presence: true

  belongs_to(
    :author,
    :class_name => 'User',
    :foreign_key => :author_id,
    :primary_key => :id
  )

  has_many :notes, dependent: :destroy

end
