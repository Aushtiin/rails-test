class Api::UsersController < Api::ApplicationController
  respond_to :json

  def index
    @users = User.all
    render '/api/users/index'
  end

  def profile
    @user = current_user
    @scheduled_groups = ScheduledGroup.all
    render '/api/users/profile'
  end

end
