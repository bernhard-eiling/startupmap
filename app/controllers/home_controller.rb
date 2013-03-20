class HomeController < ApplicationController
  def index
  	@players = Player.all
    @numStartups = Player.where(:kind => "startup")
    @numInvestors = Player.where(:kind => "investor")
    @numGraz = Player.where(:city => "Graz")
    @numSalzburg = Player.where(:city => "Salzburg")
    @numWien = Player.where(:city => "Wien")
  	respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @players }
    end
    #@numStartups = Player.where(:kind => "startup")

  end

  def placeMarker
    #@players = Player.where("kind = ? AND city = ?", params[:kind], params[:city])
    @players = Player.where(:city => params[:city]).where(:kind => params[:kind])
  end

  def searchPlayer   
    q = "%#{params[:name]}%"
    # User.where("name like ? or description like ?", q, q)
    @players = Player.where("name like ?", q)
  end
end
