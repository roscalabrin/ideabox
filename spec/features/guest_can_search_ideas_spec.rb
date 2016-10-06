require 'rails_helper'

describe "Guest can search ideas", type: :feature, js: true do
  before do
    create(:idea, title: "Idea1")
    create(:idea, title: "Cool Idea")
    visit root_path
  end
  it "removes idea from the list" do
    within ('.search-form') do
      fill_in "search", with: "Cool"
    end
  
    expect(page).to_not have_content "Idea1"
    expect(page).to have_content "Cool Idea"
  end
end