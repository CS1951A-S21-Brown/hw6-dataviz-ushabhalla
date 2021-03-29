// // Add your JavaScript code here
// const MAX_WIDTH = Math.max(1080, window.innerWidth);
// const MAX_HEIGHT = 720;
// const margin1 = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
// let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
// let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
// let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 40},
  width = 700 - margin.left - margin.right,
  height = 400 - margin.top/3 - margin.bottom;

var svg = d3.select("#graph3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+80)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

let color = d3.scaleOrdinal()
    .range(d3.quantize(d3.interpolateHcl("#66a0e2", "pink"), 7));


svg.append("text")
  .attr("transform",
        "translate(" + (width/2) + " ," +
                       (height + margin.top + 20) + ")")
  .attr("id", "graph3_xlabel")
  .style("text-anchor", "middle")
  .text("Country");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .attr("id", "graph3_ylabel")
  .style("text-anchor", "middle")
  .text("Percent Wins");

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 + (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Top Performing Teams");

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("graph_3.csv", function(data) {

    // X axis
    x.domain(data.map(function(d) { return d.Country; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    var u = svg.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.Country); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVar]); })
        .attr("fill", function(d) { return color(d[selectedVar]) })
  })


}

// Initialize plot
update('Value')
