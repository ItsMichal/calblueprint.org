# == Schema Information
#
# Table name: member_roles
#
#  id         :integer          not null, primary key
#  created_at :datetime
#  updated_at :datetime
#  role       :string(255)
#

class MemberRole < ActiveRecord::Base
  has_many :members

  validates :role, presence: true, uniqueness: true

  def to_s
    "#{role}"
  end

  def can_be_destroyed?
    !members.exists?
  end
end
