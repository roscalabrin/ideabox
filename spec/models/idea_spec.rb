require 'rails_helper'

describe Idea, type: :model do
  it { should validate_presence_of(:title)}
  it { should validate_presence_of(:body)}
  
  it "validates the possible values for quality" do
    should validate_inclusion_of(:quality).
      in_array(['genius', 'plausible', 'swill'])
  end
  
  it "orders ideas by the created date" do
    old_idea = Idea.create(title: "Old Idea", body: "old idea description")
    new_idea = Idea.create(title: "New Idea", body: "new idea description")

    expect(Idea.order_by_created_date.last).to eq(old_idea)
  end
end