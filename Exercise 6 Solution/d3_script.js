var data_array = [10, 20, 30, 40, 50, 40, 30, 20, 10]

var w = 500;
var h = 300;
var padding = 10;
var margin = 30;

var xScale = d3.scale.linear()
  .domain([0, data_array.length])
  .range([0, w - padding]);
  
var yScale = d3.scale.linear()
  .domain([0, d3.max(data_array)])
  .range([h - padding, 0]);

var chart = d3.select("#chart")
  .append("svg")
  .attr({ // NOTE this is an alternate format for setting several attributes at once.
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
    x: function(d, i) { return xScale(i) + padding; },
    y: function(d) { return yScale(d) + padding; },
    width: w / data_array.length - padding,
    height: function(d) { return yScale(0) - yScale(d); }
  })
  .style("fill", function(d) {
    return "rgb(" + d * 5 + ", 0, 0)";
  });

// Add labels for the bars along the x axis to display the data value for each 
// bar. Use D3 data binding to append SVG text elements.
var labels = chart.selectAll(".label")
  .data(data_array)
  .enter()
  .append("text")
  .attr({
    class: "label",
    x: function(d, i) { return xScale(i) + (xScale(1) - padding) / 2 + padding; },
    y: h + 15
  })
  .text(function(d) {
    return d;
  });

// D3's built-in axis function can automatically generate a y axis.
var yAxis = d3.svg.axis()
  .scale(yScale) // sets the scale of the axis
  .orient("right") // sets the orientation of axis text relative to the axis line (options are top, bottom, left, right)
  .ticks(5); // sets the approximate number of tick marks to display on the axis

// An SVG element must be created and drawn to display the axis (using the call() function).
chart.append("g")
  .attr({
    class: "axis",
    transform: "translate(" + w + ", " + padding + ")"
  })
  .call(yAxis);
  
// Append a title to the chart, at a desired location, using the SVG text element
chart.append("text")
  .attr({
    class: "title",
    x: 10,
    y: 20
  })
  .text("A Fabulous Bar Chart");