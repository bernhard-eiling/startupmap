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
  #   def getKind
  #   @players = Player.where("kind = ?", params[:kind])
  # end
  
  def getKind
    @players = Player.where("kind = ? AND city = ?", params[:kind], params[:city])
  end
end
