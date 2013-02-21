class PlayersController < ApplicationController
  def index
  	@players = Player.all
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

 #  	def create
 #  	@player = Player.new(params[:player])
 
 #  	respond_to do |format|
 #    	if @player.save
 #      	format.html  { redirect_to(@player,
 #                    :notice => 'Dein neuer Player wurde erfolgreich erstellt.') }
 #      	format.json  { render :json => @player,
 #                    :status => :created, :location => @player }
 #    	else
 #      	format.html  { render :action => "new" }
 #      	format.json  { render :json => @player.errors,
 #                    :status => :unprocessable_entity }
 #    	end
 #  	end
	# end

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
      format.html { redirect_to root_path }
      format.json { head :no_content }
    end
  end
end
