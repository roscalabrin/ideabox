class Idea < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true
  validates :quality, inclusion: { in: %w(genius plausible swill)}
  
  def self.order_by_created_date
    order(created_at: :desc)
  end
  
  def increase_quality
    update(quality: "genius")    if quality == "genius"
    update(quality: "genius")    if quality == "plausible"
    update(quality: "plausible") if quality == "swill"
  end
  
  def decrease_quality
    update(quality: "swill")     if quality == "swill"
    update(quality: "swill")     if quality == "plausible"
    update(quality: "plausible") if quality == "genius"
  end
end
