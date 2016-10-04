require 'rails_helper'

describe "Guest sees all ideas", type: :feature , js: true do
  before do
    create(:idea, title: "Idea1")
    create(:idea, title: "Idea2")
  end

  xit "sees all ideas in the homepage" do
    visit root_path

    within ('.ideas-container') do
      expect(page).to have_content "Idea1"
      expect(page).to have_content "Idea2"
    end
  end
end