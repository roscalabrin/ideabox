require 'rails_helper'

describe "Guest can create an idea", type: :feature, js: true do
  it "adds a new idea to the page" do
    visit root_path
    
    fill_in "title", with: "New Idea"
    fill_in "body",  with: "this is a new idea"
    
    click_button "Save"
    
    within ('.ideas-container') do
      expect(page).to have_content "New Idea"
      expect(page).to have_content "this is a new idea"
      expect(page).to have_content "swill"
    end
  end
end