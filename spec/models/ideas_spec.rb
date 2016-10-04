require 'rails_helper'

describe Idea, type: :model do
  it { should validate_presence_of(:title)}
  it { should validate_presence_of(:body)}
  
  it "validates the possible values for quality" do
    should validate_inclusion_of(:quality).
      in_array(['genius', 'plausible', 'swill'])
  end
end