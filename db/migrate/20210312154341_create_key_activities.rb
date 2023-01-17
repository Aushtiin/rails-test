class CreateKeyActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :key_activities do |t|
      t.string :description
      t.references :user, null: true, foreign_key: true
      t.datetime :completed_at
      t.integer :priority
      t.integer :position
      t.date :due_date
      t.boolean :personal, default: false
      t.references :scheduled_group, null: true, foreign_key: true
      # t.references :team, null: true, foreign_key: true

      t.timestamps
    end
  end
end
