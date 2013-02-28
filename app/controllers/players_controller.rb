class PlayersController < ApplicationController
  def index
  	@players = Player.all
    @user = current_user
  	respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @players }
    end
  end

  def new
    @player = Player.new
 
    respond_to do |format|
    	format.html  # new.html.erb
    	format.json  { render :json => @player }
  	end
  end

  def create
    @user = User.find(params[:user_id])
    @comment = @user.players.create(params[:player])
    redirect_to user_path(@user)
  end

	def show
    @player = Player.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @player }
    end
  end

  def destroy
    @player = Player.find(params[:id])
    @player.destroy
 
    respond_to do |format|
      format.html { redirect_to user_path(current_user) }
      format.json { head :no_content }
    end
  end
end
