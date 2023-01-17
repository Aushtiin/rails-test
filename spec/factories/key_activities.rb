FactoryBot.define do
  factory :key_activity do
    description { "MyString" }
    user { nil }
    completed_at { "2021-03-12 07:43:41" }
    priority { 1 }
    position { 1 }
    due_date { "2021-03-12" }
    personal { false }
    scheduled_group { nil }
  end
end
