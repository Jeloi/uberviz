charts = {};

charts.bar = function() {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 340 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5, "Trips");

  function render(selection) {


    var svg = selection.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    selection.each(function(data) {
      // Convert Data
      // Map  [models] => [hour, hour, hour, hour..]
      map_result = _.map(data, function(model) {return model.attributes.day})
      // Initialize memo object so every hour has 0
      var memoObject = {"Monday":0, "Tuesday": 0, "Wednesday":0, "Thursday":0, "Friday":0, "Saturday":0, "Sunday":0}
      // Reduce [hour, hour..] => ["9": 11, "10": 20, ...]
      reduce_result = _.reduce(map_result, function(memo, val) {
        if (!memo[val]) {memo[val] = 0};
        memo[val] += 1;
        return memo;
        }, memoObject); // memo object
      // To D3 usable array of objects => [{day: "Monday", count: 16}, ..]
      data = []
      for (var key in reduce_result) {
          if (reduce_result.hasOwnProperty(key)) {
              data.push({day: key, count: reduce_result[key]});
          }
      }
      console.log(data);
      console.log(data.map(function(d) { return d.day; }));

      x.domain(data.map(function(d) { return d.day.slice(0,3); }));
      y.domain([0, d3.max(data, function(d) { return d.count; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          // .text("Rides");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.day.slice(0,3)); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.count); })
          .attr("height", function(d) { return height - y(d.count); });

    });

  }
  // Return the render function, so that chart.bar() can be called on a d3 selection
  return render;
};
