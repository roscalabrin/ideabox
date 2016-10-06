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
      expect(Idea.count).to eq(0)
      
      post '/api/v1/ideas', {title: "New Idea", body: "idea details", quality: "genius"}
  
      expect(response).to be_success
      expect(Idea.count).to eq(1)
    end
  end
  
  describe "DELETE #destroy" do
    it "returns the id of the deleted idea" do
      idea = create(:idea)
      expect(Idea.count).to eq 1
      
      delete "/api/v1/ideas/#{idea.id}"
  
      expect(response).to be_success
      expect(response.body).to eq idea.id.to_s
      expect(Idea.count).to eq 0
    end
  end
  
  describe "PUT #update" do
    it "returns the updated idea" do
      idea = create(:idea, title: "Idea1")
      expect(Idea.count).to eq 1
      
      put "/api/v1/ideas/#{idea.id}", {type: "title", content: "New Idea Title"}
  
      expect(response).to be_success
      result = JSON.parse(response.body)
      expect(result["title"]).to eq "New Idea Title"
      expect(Idea.count).to eq 1
    end
  end
end