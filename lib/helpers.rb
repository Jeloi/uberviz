# Helper Module
module Helpers
  # Converts miles to lat/long degrees. Assumes the earth is a sphere :O
  def miles_to_degrees miles
    return miles 
  end

  # Returns a random, continuous number between two numbers in a pair array
  def rand_between pair_array
    num1, num2 = pair_array[0], pair_array[1]
    if num1 <= num2
      small, big = num1, num2
    else
      big, small = num1, num2
    end
    range = big - small
    return small + rand * range
  end

  def append_to_file hash, output_file
    File.open(output_file, "a") do |file|
      file.puts JSON.pretty_generate(hash)
    end
  end

  def haversine(lat1, long1, lat2, long2)
    dtor = Math::PI/180
    r = 3959
   
    rlat1 = lat1 * dtor 
    rlong1 = long1 * dtor 
    rlat2 = lat2 * dtor 
    rlong2 = long2 * dtor 
   
    dlon = rlong1 - rlong2
    dlat = rlat1 - rlat2
   
    a = power(Math::sin(dlat/2), 2) + Math::cos(rlat1) * Math::cos(rlat2) * power(Math::sin(dlon/2), 2)
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
    d = r * c
   
    return d
  end

  def power(num, pow)
    num ** pow
  end
end