class Seed
  def self.start
    create_qualities
    create_ideas
  end

  def self.create_qualities
    Quality.create(name: "genius")
    Quality.create(name: "plausible")
    Quality.create(name: "swill")
  end

  def self.create_ideas
  end
end

Seed.start
