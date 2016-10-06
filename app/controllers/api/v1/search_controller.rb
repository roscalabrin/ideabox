class Api::V1::SearchController < ApplicationController
  def index
    require "pry"
    binding.pry
    ideas = Ideas.where(title: "tets")
    
    render json: ideas
  end
end