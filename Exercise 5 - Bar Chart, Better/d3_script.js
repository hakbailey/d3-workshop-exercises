var data_array = [10, 20, 30, 40, 50, 40, 30, 20, 10]

var w = 500;
var h = 300;
var padding = 10; // Added a global variable for padding

// D3 has a built-in scale function we can use to map our data set values to the
// size of our chart. Here, the input domain is from 0 to the number of items
// in our dataset, and the output range is from 0 to the width of our chart, 
// minus padding space.
var xScale = d3.scale.linear()
  .domain([0, data_array.length])
  .range([0, w - padding]);
  
// Create a scale for the y axis. The input domain should be from 0 to the 
// maximum value in the dataset (try using D3's built-in d3.max() function). 
// The output range should be from 0 to the height of our chart, minus padding.

// var yScale = 
  
var chart = d3.select("#chart")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

// Add a base rectangle to the SVG chart that is white with a black border, 
// to give the entire chart a border. Try giving it the "border" class 
// (already in our CSS stylesheet) to style it

// chart.append(

// Use data/enter/append to add rectangles to the SVG container, where each
// item in the data set is bound to a rectangle. Note, this is tricky because 
// we already have a rectangle in our SVG container...

// var bars = 

// Use our global variables and scales to set the bars' attributes.

// bars.attr("x", function(d, i) {
//     return xScale(i) + padding;
//   })
//   .attr("y", ...
  
// Add styles to changes the appearance of the bars. Try having the fill be a
// function of the data

// bars.style(...

// Now try adding or removing items from the dataset, and watch the chart use 
// our calculations to automatically size the bars