class Api::ApplicationController < ActionController::API
  def current_user
    #stub current user for purposes of this interview
    User.first
  end

end
