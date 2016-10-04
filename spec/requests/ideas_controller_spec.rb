require 'rails_helper'

RSpec.describe Api::V1::IdeasController, type: :request do
  describe "GET #index" do
    it "returns all ideas" do
      idea1 = create(:idea)
      idea2 = create(:idea)
  
      get '/api/v1/ideas'
      expect(response).to be_success

      expect(Idea.count).to eq(2)
    
    end
  end
  
  describe "POST #create" do
    it "returns the idea created" do
      idea = create(:idea)
      expect(Idea.count).to eq(1)
      
      post '/api/v1/ideas', {title: "New Idea", body: "idea details", quality: "genius"}
  
      expect(response).to be_success

      expect(Idea.count).to eq(2)
    
    end
  end
end