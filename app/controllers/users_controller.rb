class UsersController < ApplicationController
  def index
  	@users = User.all
  	respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @users }
    end
  end

  def show
  	@user = current_user
  	respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @user }
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
 
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end
end