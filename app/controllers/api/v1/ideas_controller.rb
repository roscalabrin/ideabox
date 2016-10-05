class Api::V1::IdeasController < ApplicationController
  before_action :set_idea, only: [:update, :update_quality, :destroy]
  
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
    @idea.delete
    
    render json: @idea.id
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
        @idea.increase_quality
      else
        @idea.decrease_quality
      end
    end
end
