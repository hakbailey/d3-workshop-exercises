// Your dataset
var data_array = [10, 20, 30, 40, 50]

// Global variables for the width and height of the chart 
var w = 500;
var h = 300;

// Append an SVG container to the body and store it in a "chart" variable
var chart = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// Use data/enter/append to add rectangles to the SVG container, where each
// item in the data set is bound to a rectangle
var bars = chart.selectAll("rect")
  .data(data_array)
  .enter()
  .append("rect");

// Add necessary attributes to draw the rectangles (x, y, width, height)
bars.attr("class", ".bar")
  .attr("x", function(d, i) {
    return i * 50;
  })
  .attr("y", 0)
  .attr("width", 30)
  .attr("height", function(d) {
    return d * 2;
  });

// Add styles to changes the appearance of the bars
bars.style("fill", "green")
  .style("stroke", "black")
  .style("stroke-width", 2)
  .style("shape-rendering", "crispEdges");