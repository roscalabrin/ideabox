class CreateIdeas < ActiveRecord::Migration[5.0]
  def change
    create_table :ideas do |t|
      t.text :title
      t.text :body
      t.references :quality, foreign_key: true, default: 3
    end
  end
end
