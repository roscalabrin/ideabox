class Api::V1::IdeasController < ApplicationController
  
  def index
    ideas = Idea.order_by_created_date
    render json: ideas
  end
  
  def create
    idea = Idea.create(
      title: params[:title],
      body: params[:body],
      quality: params[:quality]
    )
  
    render json: idea
  end
  
  def destroy
    idea = Idea.find(params[:id])
    idea.delete
    
    render json: idea.id
  end
end