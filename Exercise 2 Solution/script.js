// Turn all pretty paragraphs red
d3.selectAll(".pretty").style("color", "red");

// Turn only the first pretty paragraph blue
d3.select(".pretty").style("color", "blue");

// Make the third paragraph huge
d3.select("#p3").style("font-size", "48px");

// Make all paragraphs the same
d3.selectAll("p").attr("class", "pretty");
d3.selectAll("p").style("color", "black").style("font-size", "14px").style("font-family", "Helvetica, Arial, sans-serif");