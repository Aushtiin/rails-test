class Api::KeyActivitiesController < Api::ApplicationController
  before_action :set_key_activity, only: [:update, :destroy]

  respond_to :json

  def index
    @key_activities = KeyActivity.owned_by_user(current_user).sort_by_position
    render "api/key_activities/index"
  end

  def create
    @key_activity = KeyActivity.new(key_activity_params)
    @key_activity.insert_at(1)
    @key_activity.save!

    @key_activities_to_render = KeyActivity.owned_by_user(current_user).sort_by_position
    render "api/key_activities/create"
  end

  def update
    if params[:completed]
      # if we complete an item on the master list, it should move it to the end
      @key_activity.update!(key_activity_params.merge(completed_at: Time.now, scheduled_group: ScheduledGroup.find_by_name("Backlog")))
      @key_activity.move_to_bottom
    else
      #if you move an item to todays list, it should set the moved_to_today_on
    end

    @key_activities_to_render = KeyActivity.owned_by_user(current_user).sort_by_position
    render "api/key_activities/update"
  end


  def destroy
    @key_activity.destroy!
    @key_activities_to_render = KeyActivity.owned_by_user(current_user).sort_by_position
    render "api/key_activities/destroy"
  end


  def resort
    if params[:sort].present? && params[:scheduled_group_id].present?
      key_activities = KeyActivity.owned_by_user(current_user)
      KeyActivityResortService.call(key_activities, params[:sort], params[:scheduled_group_id])
      @key_activities = KeyActivity.owned_by_user(current_user).sort_by_progressing_non_backlog_position
    else
      raise "No Sort Type Given"
    end
    render "api/key_activities/index"
  end

  private

  def key_activity_params
    params.permit(:id, :user_id, :description, :completed_at, :priority, :complete, :position, :due_date, :personal, :scheduled_group_id)
  end

  def set_key_activity
    @key_activity = KeyActivity.find(params[:id])
  end
end
