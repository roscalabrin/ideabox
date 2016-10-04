class Idea < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
  validates :quality, inclusion: { in: %w(genius plausible swill)}
  
  def self.order_by_created_date
    order(created_at: :desc)
  end
end
