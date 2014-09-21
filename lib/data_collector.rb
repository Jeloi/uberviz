require 'json'
require 'yelp'
require 'google_places'
require 'sequel'
require "csv"
require 'pp'

# --- Setup ---
# Load configurations from configs.json
@configs = JSON.parse( IO.read('./lib_configs.json') )

DB = Sequel.sqlite('luckyphil.db')

# --- Google API Client ---
def collect_chipotles
  
  @client = GooglePlaces::Client.new(@configs["google"]["server_api_key"])

  # Recreate the database table
  if !DB.table_exists?(:chipotles)
    DB.drop_table(:chipotles)
  end
  DB.create_table :chipotles do
    primary_key :id
    String :name
    String :address
    Float :lat
    Float :lng
    String :reference
    String :icon
  end

  chipotles = DB[:chipotles]

  options = {
    name: 'Chipotle',
    radius: 20000,
    types: ['restaurant', 'food'],
    lat: 40.7100580,
    lng: -74.0096600,
    multipage: true
  }

  @response = @client.spots_by_query("Chiptole in New York City", options)

  pp "Retrieved " + @response.size.to_s + " Chipotle Restaurants"

  # pp @response.size

  CSV.open("chipotles.csv", 'w' ) do |file|
    file << %w(id name address lat lng reference icon)

    @response.each do |spot|
      object = {
        name: spot.name,
        address: spot.formatted_address,
        lat: spot.lat,
        lng: spot.lng,
        reference: spot.reference,
        icon: spot.icon
      }
      # Insert into Sqlite DB
      id = chipotles.insert(object)

      file.puts object.values.unshift(id)
    end

  end

end

# Load Pokemon from pokemon.csv
def collect_pokemon
  if DB.table_exists?(:pokemon)
    DB.drop_table(:pokemon)
  end

  DB.create_table :pokemon do
    primary_key :id
    String :name
  end
  pokemon = DB[:pokemon]

  CSV.foreach("pokemon.csv", headers: true) do |row|
    pokemon.insert(id: row["id"], name: row["identifier"].capitalize)
  end 

  puts "Collected #{pokemon.count} Pokemon"
end

collect_pokemon


# --- Yelp API Client --- Sadly, Yelp doesn't appear to give business geolocation data

# Yelp Configs 
YOUR_CONSUMER_KEY = @configs["yelp"]["consumer_key"]
YOUR_CONSUMER_SECRET = @configs["yelp"]["consumer_secret"]
YOUR_TOKEN = @configs["yelp"]["token"]
YOUR_TOKEN_SECRET = @configs["yelp"]["token_secret"]

yelp_client = Yelp::Client.new({ consumer_key: YOUR_CONSUMER_KEY,
                            consumer_secret: YOUR_CONSUMER_SECRET,
                            token: YOUR_TOKEN,
                            token_secret: YOUR_TOKEN_SECRET
                          })
# Search
# $response = yelp_client.search('New York Chipotle')