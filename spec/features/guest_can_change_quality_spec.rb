require 'rails_helper'

describe "Guest can change quality of an existing idea", type: :feature, js: true do
  before(:each) do
    create(:idea, title: "Idea1", quality: "plausible")
    visit root_path
  end
  it "increases the quality of an idea" do
    expect(page).to have_content "Idea1"
    expect(page).to have_content "plausible"
    
    within ('.idea-details') do
      find(:css, '.quality-up').click
    end
  
    expect(page).to have_content "Idea1"
    expect(page).to have_content "genius"
    expect(page).to_not have_content "plausible"
  end
  
  it "decreases the quality of an idea" do
    expect(page).to have_content "Idea1"
    expect(page).to have_content "plausible"
    
    within ('.idea-details') do
      find(:css, '.quality-down').click
    end
  
    expect(page).to have_content "Idea1"
    expect(page).to have_content "swill"
    expect(page).to_not have_content "plausible"
  end
end