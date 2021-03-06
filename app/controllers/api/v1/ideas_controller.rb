class Api::V1::IdeasController < ApplicationController
  before_action :set_idea, only: [:update, :update_quality, :destroy, :show]
  
  def index
    ideas = Idea.order_by_created_date
    render json: ideas
  end
  
  def create
    if (params[:title] == "") || (params[:body] == "")
      flash[:alert] = "Invalid title or body"
    else
      idea = create_idea(params)
    end
    
    render json: idea
  end
  
  def show
    render json: @idea.body  
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
    
    def create_idea(params)
      Idea.create(
        title: params[:title],
        body: params[:body]
      )
    end
end
