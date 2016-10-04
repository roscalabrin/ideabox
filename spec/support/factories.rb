FactoryGirl.define do
  factory :idea do
    title Faker::Lorem.word 
    body Faker::Lorem.sentences(1) 
  end
end