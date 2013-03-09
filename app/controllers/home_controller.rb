class HomeController < ApplicationController
  def index
  	@players = Player.all
  	respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @players }
    end
  end
  
  def placeMarker
    @players = Player.where("kind = ? AND city = ?", params[:kind], params[:city])
  end
  def searchPlayer   
    q = "%#{params[:name]}%"
    # User.where("name like ? or description like ?", q, q)
    @players = Player.where("name like ?", q)
  end
end
