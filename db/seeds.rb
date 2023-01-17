# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

["Today", "Tomorrow", "Weekly List", "Backlog"].each do |group|
  ScheduledGroup.where(name: group).first_or_create
end

user = User.where(email: "test@test.com").first_or_create(email: "test@test.com", first_name: "Test", last_name: "Tester")

if KeyActivity.all.blank?
  3.times do |n|
    ScheduledGroup.all.each_with_index do |sg, index|
      KeyActivity.create(scheduled_group: sg, user: user, description: "description #{sg.name} #{n}", position: n+1, priority: n, due_date: Date.today+((n % 2) + index).days)
    end
  end
end