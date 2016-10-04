class Seed
  def self.start
    create_ideas
  end
  
  def self.create_ideas
    Idea.create(title: "Idea1", body: "this is the first idea")
    Idea.create(title: "Idea2", body: "this is the second idea")
    Idea.create(title: "Idea3", body: "this is the thid idea")
  end
end

Seed.start
