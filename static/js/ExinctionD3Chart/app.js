// Group Babylon
// Project 2
// James Dietz



// Define SVG area dimensions
var svgWidth = 999;
var svgHeight = 700;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 60,
  bottom: 60,
  left: 80
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#langDeaths")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%Y");


// Load data from miles-walked-this-month.csv
d3.csv("../static/js/ExinctionD3Chart/years.csv", function(error, extinctData) {

  // Throw an error if one occurs
  if (error) throw error;

  // Print the milesData
  console.log("years data: ", extinctData);

  // Format the date and cast the miles value to a number
  extinctData.forEach(function(data) {
    data.year1 = parseTime(data.year);
    data.cumulative = +data.cumulative;
    data.field1 = data.field1;
  });

  // Configure a time scale with a range between 0 and the chartWidth
  // Set the domain for the xTimeScale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(extinctData, data => data.year1));

  // Configure a linear scale with a range between the chartHeight and 0
  // Set the domain for the xLinearScale function
  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(extinctData, data => data.cumulative + 10)]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a drawLine function which will use our scales to plot the line's points
  var drawLine = d3
    .line()
    .x(data => xTimeScale(data.year1))
    .y(data => yLinearScale(data.cumulative));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for milesData
    .attr("d", drawLine(extinctData))
    .classed("line", true);

  // Append an SVG group element to the SVG area, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);
    
  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 15)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axis-text")
    .text("Cumulative Number of Language Deaths");

  chartGroup.append("text")
      .attr("y", chartHeight + 50)
      .attr("x", chartWidth/2)
      .attr("class", "axis-text")
      .text("Year");


  var circlesGroup = chartGroup.selectAll("circle")
    .data(extinctData)
    .enter()
    .append("circle")
    .attr("class", "circles")
    .attr("cx", d => xTimeScale(d.year1))
    .attr("cy", d => yLinearScale(d.cumulative))
    .attr("r", "8")
    .attr("opacity", 0.5)
    ;

  var toolTip = d3.select("#langDeaths").append("div")
    .attr("class", "tooltip");

  // Add an onmouseover event to display a tooltip
  // ========================================================
  circlesGroup.on("mouseover", function(extinctData) {
    toolTip.style("display", "block");
    toolTip.html(`Cumlative Total: ${extinctData.cumulative} <br> Language Deaths in ${extinctData.year}: <br> ${extinctData.field1} <br>${extinctData.field2} <br>${extinctData.field3} <br>${extinctData.field4} <br>${extinctData.field5} <br>${extinctData.field6} <br>${extinctData.field7} <br>${extinctData.field8} <br>${extinctData.field9} <br>${extinctData.field10} <br>${extinctData.field11} <br>${extinctData.field12}`)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px")
      .attr("opacity", 0.5);
  })
    // Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function() {
      toolTip.style("display", "none")
      .attr("opacity", 0);
    });
    

    });
  
  
