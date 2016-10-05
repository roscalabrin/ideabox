require 'rails_helper'

describe "Guest can delete an existing idea", type: :feature, js: true do
  before do
    create(:idea, title: "Idea1")
    create(:idea, title: "Idea2")
    visit root_path
  end
  xit "removes idea from the list" do
    within () do
      click_button "Delete"
    end
    
    expect(page).to have_content "Idea1"
    expect(page).to_not have_content "Idea2"
  end
end