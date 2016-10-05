class Api::V1::IdeasController < ApplicationController
  before_action :set_idea, only: [:update, :update_quality]
  
  def index
    ideas = Idea.order_by_created_date
    render json: ideas
  end
  
  def create
    idea = Idea.create(
      title: params[:title],
      body: params[:body]
    )
  
    render json: idea
  end
  
  def destroy
    idea = Idea.find(params[:id])
    idea.delete
    
    render json: idea.id
  end
  
  def update  
    if params[:type] == "quality"
      update_quality(params)
    else  
      @idea.update(params[:type] => params[:content])
    end
     
    render json: @idea
  end
  
  private
  
    def set_idea
      @idea = Idea.find(params[:id])
    end
  
    def update_quality(params)
      if params[:content] == "increase"
        @idea.update(quality: "genius") if @idea.quality == "plausible"
        @idea.update(quality: "plausible") if @idea.quality == "swill"
      else
        @idea.update(quality: "plausible") if @idea.quality == "genius"
        @idea.update(quality: "swill") if @idea.quality == "plausible"
      end
      
      # render json: @idea
    end
end