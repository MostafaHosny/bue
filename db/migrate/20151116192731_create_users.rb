class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.integer :std_id

      t.timestamps null: false
    end
  end
end
