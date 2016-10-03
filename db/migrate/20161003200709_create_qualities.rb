class CreateQualities < ActiveRecord::Migration[5.0]
  def change
    create_table :qualities do |t|
      t.text :name, default: "swill"
    end
  end
end
