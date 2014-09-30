require 'json'
require 'sequel'
require "date"
require 'pp'
require "csv"
require "active_support/core_ext"
require './helpers'

DB = Sequel.sqlite('luckyphil.db')
POKEMON = Hash.new()
START_DATE = DateTime.new(2014,8,1,0,0,0,'-5')

# Setup Pokemon {:id => :name} Hash
CSV.read("pokemon.csv").each do |pair|
  POKEMON[pair[0].to_i] = pair[1]
end

# Phil's existential state
class Phil
  include Helpers
  # Home Lat/Long
  HOME_LAT = 40.7100580
  HOME_LONG = -74.0096600
  HOME_ADDRESS = "176 Broadway, New York, NY, United States"
  HOME = [HOME_LAT, HOME_LONG]

  # Number of miles North and West Phil can wander
  N_WANDER_MILES = 1
  W_WANDER_MILES = 0.5

  # Ranges for meal times, expressed as hours from start of day (e.g 0 = 12am)
  BREAKFAST = [11,13] # Chipotles open at 11am
  LUNCH = [13,17]
  DINNER = [17,22] # And close at 10pm

  # Driver Speed in mph
  SPEED = 40

  attr_accessor :today, :current_location, :current_address, :last_meal, :output_file, :last_driver, :visited_chipotles, :trip_history

  def initialize
    @trip_history = []
  end

  # State Helper Methods
  def is_tuesday_living?
    return today.strftime("%A") == "Tuesday"
  end
  def going_out?
    return ["Thursday"]
  end
  def is_bored?
    
  end

  def go_to meal_hours
    trip = {} # Trip Hash
    trip[:request_time] = today + rand_between(meal_hours).hours
    trip[:start_time] = (trip[:request_time] + rand(3..8).minutes)
    chipotle = DB[:chipotles][id: rand(1..60)] # Randomly pick a Chipotle
    trip[:end_location] = {
      address: chipotle[:address],
      latitude: chipotle[:lat],
      longitude: chipotle[:lng],
    }
    generate_trip trip
  end

  def go_home
    # TODO
  end

  def wander
    lat_wander = miles_to_degrees(N_WANDER_MILES)
    long_wander = miles_to_degrees(W_WANDER_MILES)

    new_lat = current_location[0] + (2*lat_wander - lat_wander)
    new_long = current_location[1] + (2*long_wander - long_wander)

    current_location[0] = new_lat
    current_location[1] = new_long
  end

  def generate_trip trip = {}
    default = {
      uuid: "phils-id",
      status: 'complete',
      product_id: rand(1..9999),
      start_location: {
        address: current_address,
        latitude: current_location[0],
        longitude: current_location[1]
      }
    }
    trip = default.merge(trip)

    trip[:distance] = haversine trip[:start_location][:latitude], trip[:start_location][:longitude], trip[:end_location][:latitude], trip[:end_location][:longitude]
    # Convert times to Unix times
    trip[:end_time] = (trip[:start_time] + (trip[:distance]/(SPEED/60.0)).minutes).to_time.utc.to_i
    trip[:request_time] = trip[:request_time].to_time.utc.to_i
    trip[:start_time] = trip[:start_time].to_time.utc.to_i
    # Driver id and Name
    trip[:driver_id] = rand(1..151) # only the original 151 pokemon
    trip[:driver_name] = POKEMON[trip[:driver_id]]

    @trip_history.push(trip) # Add trip to trip_history

    # Update Phil's state
    @current_location = [trip[:end_location][:latitude], trip[:end_location][:longitude]]
    @current_address = trip[:end_location][:address]
    @last_meal = trip[:end_time]

  end

  # Export Phil's history to Json in the output_file, mirroring the Uber API's history endpoint schema
  def export_user_history
    output = {
      offset: 0,
      limit: 9999,
      count: @trip_history.size,
      history: @trip_history
    }
    File.open(output_file, "w") do |f|
      f.puts JSON.pretty_generate(output)
    end
  end

end

# Blueprint for Phil's awesome month
def generate_awesome_month start_date, output_file
  # Lucky Phil comes into existence
  luckyphil = Phil.new
  luckyphil.today = start_date
  luckyphil.output_file = output_file
  luckyphil.current_location = Phil::HOME # Home is where it all started
  luckyphil.current_address = Phil::HOME_ADDRESS

  breakfast = Phil::BREAKFAST
  lunch = Phil::LUNCH
  dinner = Phil::DINNER

  # For each of the 31 days of the awesome month..
  (0..30).each do | num |
    # Ahh a new day!
    luckyphil.today = start_date + num.days
    luckyphil.last_meal = nil # Phil is hungry

    # Breakfast
    luckyphil.go_to breakfast
    # luckyphil.wander

    # # Lunch
    luckyphil.go_to lunch
    # luckyphil.wander

    # # If Phil is tuesday livin' he goes home for tacos
    if luckyphil.is_tuesday_living?
      # luckyphil.go_home
      next # That's a wrap on the day
    end

    luckyphil.go_to dinner

    # luckyphil.go_home

  end

  luckyphil.export_user_history
end


# Lets gooo
generate_awesome_month START_DATE, ARGV[0]