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

var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")

function update(selectedVar) {

  d3.csv("graph_3.csv", function(data) {

    x.domain(data.map(function(d) {
      return d.Country;
    }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    y.domain([0, d3.max(data, function(d) {
      return +d[selectedVar]
    }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    var u = svg.selectAll("rect")
      .data(data)

    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) {
          return x(d.Country);
        })
        .attr("y", function(d) {
          return y(d[selectedVar]);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          return height - y(d[selectedVar]);
        })
        .attr("fill", function(d) {
          return color(d[selectedVar])
        })
  })
}

update('Value')
