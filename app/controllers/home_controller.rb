class HomeController < ApplicationController
  def index
  	@players = Player.all
  	respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @players }
    end
  end

  def getCity
  	@players = Player.where("city = ?", params[:city])
  end
end
