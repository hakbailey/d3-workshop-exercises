// Your dataset is gone! It's in separate file that we can load using D3's 
// csv() function. First let's declare a global variable called data_array 
// for our dataset.
var data_array;

// Then load the external csv file 
d3.csv("data.csv",

  // This parameter is optional, but useful if your dataset contains non-string data
  function(csv) {
    return {
      food: csv.food,
      like: +csv.like, // Convert "like" column to number
      type: csv.type
    };
  },

  // This parameter is where we define what we want to do with our data
  function(error, data) {
    // Write the data to the console so we can confirm that it loaded
    console.log(data);
    // Assign data to our global data_array variable
    data_array = data;
    // Call our new chart-drawing function
    drawChart();
  }
);

var w = 500;
var h = 300;
var padding = 10;
var margin = 30;
// A new color variable! D3 has several built-in color scales.
var color = d3.scale.category10();

// We've now enclosed all of our chart-drawing code in a function, so we can 
// call it from within D3's csv() function to ensure the data has loaded
function drawChart() {

  var xScale = d3.scale.linear()
    .domain([0, data_array.length])
    .range([0, w - padding]);

  var yScale = d3.scale.linear()
    // Since each item in our data array is now an object instead of a number,
    // we have to specify which property of each datum (d) we want to use. In 
    // this case we want to use the "like" property as our values for the y scale.
    .domain([0, d3.max(data_array, function(d) {
      return d.like; // Accesses the "like" property of each datum as d3 loops through the data array
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
        return yScale(d.like) + padding; // Another place where we use d.like instead of d
      },
      width: w / data_array.length - padding,
      height: function(d) {
        return yScale(0) - yScale(d.like); // Again replacing d with d.like
      }
    })
    .style("fill", function(d) {
      // Use our color() function to assign color based on the "type" property 
      // of the data (access it the same way we did the "like" property).
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
      // Change the label text to display the name of the food ("food" property)
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
}