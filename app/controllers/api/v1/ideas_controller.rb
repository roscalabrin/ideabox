class Api::V1::IdeasController < ApplicationController
  respond_to :json
  
  def index
    respond_with Idea.order_by_created_date
  end
end