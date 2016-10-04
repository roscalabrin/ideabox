class Api::V1::IdeasController < ApplicationController
  respond_to :json
  
  def index
    respond_with Idea.order_by_created_date
  end
  
  def create
    idea = Idea.create(
      title: params[:title],
      body: params[:body],
      quality: params[:quality]
    )
    respond_with idea
  end
end