// Test the enter() and update() functions

var data_array = [10, 20, 30, 40, 50];

// Bind the data to a selection of paragraph elements
var binding = d3.select("body")
  .selectAll("p")
  .data(data_array);

// // Update existing paragraph elements 
// binding.attr("class", "old")
//   .text(function(d) {
//     return "Old paragraph with bound data: " + d;
//   });

// // Append new paragraph elements as needed
// binding.enter()
//   .append("p")
//   .attr("class", "new")
//   .text(function(d) {
//     return "New paragraph with bound data: " + d;
//   });




// Test the exit() function

var small_data_array = [2, 4];

// // Bind data to selection of p elements
// var binding = d3.select("body")
//   .selectAll("p")
//   .data(small_data_array);

// // Update existing p elements
// binding.text(function(d) {
//   return "Old paragraph with bound data: " + d;
// });

// // Remove extra paragraphs
// binding.exit().remove();