# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_12_154341) do

  create_table "key_activities", force: :cascade do |t|
    t.string "description"
    t.integer "user_id"
    t.datetime "completed_at"
    t.integer "priority"
    t.integer "position"
    t.date "due_date"
    t.boolean "personal", default: false
    t.integer "scheduled_group_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["scheduled_group_id"], name: "index_key_activities_on_scheduled_group_id"
    t.index ["user_id"], name: "index_key_activities_on_user_id"
  end

  create_table "scheduled_groups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "key_activities", "scheduled_groups"
  add_foreign_key "key_activities", "users"
end
