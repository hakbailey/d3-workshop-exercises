var data_array;
var w = 500;
var h = 300;
var padding = 10;
var margin = 30;
var color = d3.scale.category10();

d3.csv("data.csv", function(csv) {
  return {
    food: csv.food,
    like: +csv.like,
    type: csv.type
  };
}, function(error, data) {
  data_array = data;
  drawChart();
});

function drawChart() {

  var xScale = d3.scale.linear()
    .domain([0, data_array.length])
    .range([0, w - padding]);

  var yScale = d3.scale.linear()
    .domain([0, d3.max(data_array, function(d) {
      return d.like;
    })])
    .range([h - padding, 0]);

  var chart = d3.select("#chart")
    .append("svg")
    .attr({
      width: w + margin,
      height: h + margin
    });

  chart.append("rect")
    .attr({
      class: "border",
      x: 0,
      y: 0,
      width: w,
      height: h
    });

  var bars = chart.selectAll(".bar")
    .data(data_array)
    .enter()
    .append("rect")
    .attr({
      class: "bar",
      x: function(d, i) {
        return xScale(i) + padding;
      },
      y: function(d) {
        return yScale(d.like) + padding;
      },
      width: w / data_array.length - padding,
      height: function(d) {
        return yScale(0) - yScale(d.like);
      }
    })
    .style("fill", function(d) {
      return color(d.type);
    });

  var labels = chart.selectAll(".label")
    .data(data_array)
    .enter()
    .append("text")
    .attr({
      class: "label",
      x: function(d, i) {
        return xScale(i) + (xScale(1) - padding) / 2 + padding;
      },
      y: h + 15
    })
    .text(function(d) {
      return d.food;
    });

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")
    .ticks(5);

  chart.append("g")
    .attr({
      class: "axis",
      transform: "translate(" + w + ", " + padding + ")"
    })
    .call(yAxis);

  var title = chart.append("text")
    .attr({
      class: "title",
      x: w / 2,
      y: 20
    })
    .text("A Fabulous Bar Chart")
    .style("text-anchor", "middle");

  // Adds an event listener to turn each bar yellow when the mouse is over it
  bars.on("mouseover", function() {
    d3.select(this)
      .style("fill", "yellow");
  });

  // Create another event listener to turn each bar back to its original color 
  // when the mouse is no longer over it (the event is called "mouseout").
  bars.on("mouseout", function() {
    d3.select(this)
      .style("fill", function(d) {
        return color(d.type);
      });
  });

  // Adds an event listener to sort the bars and bar labels when "Sort" is clicked.
  d3.select("#sort").on("click", function() {
    sortBars();
    sortLabels();
  });

  // Function to sort the bars. Makes use of D3's sort function.
  var sortBars = function() {
    bars.sort(function(a, b) {
        return d3.descending(a.like, b.like);
      })
      .transition() // D3 also has a built-in function for animated transitions 
      .duration(1000) // Specifies the duration of the transition in milliseconds
      .attr("x", function(d, i) {
        return xScale(i) + padding;
      });
  }

  // Using the above example as a model, write a function to sort the labels.
  // Note that the only thing you'll need to change is the x attribute of the
  // label, as above, and you'll want to use the same function we used when we 
  // originally drew the labels.
  var sortLabels = function() {
    labels.sort(function(a, b) {
        return d3.descending(a.like, b.like);
      })
      .transition()
      .duration(1000)
      .attr("x", function(d, i) {
        return xScale(i) + (xScale(1) - padding) / 2 + padding;
      });
  }

  // Create another event listener for the Group element (id is "group") that 
  // calls the two functions below.
  d3.select("#group").on("click", function() {
    groupBars();
    groupLabels();
  });

  // Create a function to group the bars by type.
  var groupBars = function() {
    bars.sort(function(a, b) {
        return d3.ascending(a.type, b.type);
      })
      .transition()
      .duration(1000)
      .attr("x", function(d, i) {
        return xScale(i) + padding;
      });
  }

  // Create a function to group the labels by type as well.
  var groupLabels = function() {
    labels.sort(function(a, b) {
        return d3.ascending(a.type, b.type);
      })
      .transition()
      .duration(1000)
      .attr("x", function(d, i) {
        return xScale(i) + (xScale(1) - padding) / 2 + padding;
      });
  }

}