require 'rails_helper'

describe "Guest sees all ideas", type: :feature , js: true do
  before(:each) do
    create(:idea, title: "Idea1")
    create(:idea, title: "Idea2")
    visit root_path
  end

  it "sees all ideas in the homepage" do
    
    within ('.ideas-container') do
      expect(page).to have_content "Idea1"
      expect(page).to have_content "Idea2"
    end
  end
end