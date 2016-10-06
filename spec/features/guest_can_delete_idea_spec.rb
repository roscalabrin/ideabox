require 'rails_helper'

describe "Guest can delete an existing idea", type: :feature, js: true do
  before do
    create(:idea, title: "Idea1")
    visit root_path
  end
  it "removes idea from the list" do
    within ('.idea-details') do
      find(:css, '.delete-idea').click
    end
  
    expect(page).to_not have_content "Idea1"
  end
end