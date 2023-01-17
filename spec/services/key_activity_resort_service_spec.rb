require 'rails_helper'

RSpec.describe KeyActivityResortService do
  let!(:scheduled_group_today) {create(:scheduled_group, name: "Today")}
  let!(:scheduled_group_tomorrow) {create(:scheduled_group, name: "Tomorrow")}
  let!(:user) {create(:user)}
  let!(:ka0) {create(:key_activity, description: "Today0", scheduled_group: scheduled_group_today, position: 1, priority: 0, due_date: Date.new(2021,3,6), user: user)}
  let!(:ka1) {create(:key_activity, description: "Today1", scheduled_group: scheduled_group_today, position: 2, priority: 2, due_date: Date.new(2021,3,2), user: user)}
  let!(:ka2) {create(:key_activity, description: "Today2", scheduled_group: scheduled_group_today, position: 3, priority: 1, due_date: Date.new(2021,3,2), user: user)}
  let!(:ka3) {create(:key_activity, description: "Today3", scheduled_group: scheduled_group_today, position: 4, priority: 2, due_date: Date.new(2021,3,4), user: user)}
  let!(:ka4) {create(:key_activity, description: "Today4", scheduled_group: scheduled_group_today, position: 5, priority: 2, due_date: Date.new(2021,3,1), user: user)}
  let!(:kat0) {create(:key_activity, description: "Tomorrow0", scheduled_group: scheduled_group_tomorrow, position: 1, priority: 0, due_date: Date.new(2021,3,6), user: user)}
  let!(:kat1) {create(:key_activity, description: "Tomorrow1", scheduled_group: scheduled_group_tomorrow, position: 2, priority: 1, due_date: Date.new(2021,3,2), user: user)}
  describe "call" do
    it "resorts items by priority if selected to do so" do
      KeyActivityResortService.call(KeyActivity.all, "by_priority", scheduled_group_today.id)
      expect( KeyActivity.where(scheduled_group: scheduled_group_today).sort_by_position ).to eq([ka1,ka3,ka4,ka2,ka0])
      expect(KeyActivity.where(scheduled_group: scheduled_group_tomorrow.id).sort_by_position).to eq([kat0, kat1])
    end

    it "resorts items by due date if selected to do so" do
      KeyActivityResortService.call(KeyActivity.all, "by_due_date", scheduled_group_today.id)
      expect( KeyActivity.where(scheduled_group: scheduled_group_today).sort_by_position ).to eq([ka4,ka1,ka2,ka3,ka0])
      expect(KeyActivity.where(scheduled_group: scheduled_group_tomorrow.id).sort_by_position).to eq([kat0, kat1])
    end

    it "resorts items by due date and priority if selected to do so" do
      KeyActivityResortService.call(KeyActivity.all, "by_due_date_and_priority", scheduled_group_today.id)
      expect(KeyActivity.where(scheduled_group: scheduled_group_today).sort_by_position).to eq([ka4, ka1, ka2, ka3, ka0])
      expect(KeyActivity.where(scheduled_group: scheduled_group_tomorrow.id).sort_by_position).to eq([kat0, kat1])
    end
  end
end
