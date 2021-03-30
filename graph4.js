// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


var svg1 = d3.select("#my_dataviz"),
    width = +svg1.attr("width"),
    height = +svg1.attr("height");

var projection = d3.geoMercator()
    .center([0,20])
    .scale(99)
    .translate([ width/2, height/2 ])

d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
  .defer(d3.csv, "graph_3v2.csv")
  .await(ready);

function ready(error, dataGeo, data) {

  var valueExtent = d3.extent(data, function(d) {
    return +d.Value;
  })

  var size = d3.scaleSqrt()
    .domain(valueExtent)
    .range([ 1, 50])

  svg1.append("g")
      .selectAll("path")
      .data(dataGeo.features)
      .enter()
      .append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
      .style("stroke", "none")
      .style("opacity", .3)


  svg1
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "black")
      .attr("x", width - 10)
      .attr("y", height - 30)
      .attr("width", 90)
      .html("Top Winning Teams Mapped Out")
      .style("font-size", 14)


}


function update2(selectedVar) {
  var element = document.getElementById("win");
  var valuesToShow;
  if (selectedVar=='Value'){
    valuesToShow = [0.6,0.7,.8]
    element.innerText = "Top Performing Teams by Percent Wins"
  } else {
    valuesToShow = [1,3,5]
    element.innerText = "Top Performing Teams by Number of Wins"
  }

  var size1 = d3.scaleSqrt()
    .domain(valuesToShow)  // What's in the data
    .range([ 1, 50]);
  var xCircle = 60
  var xLabel = 90
  var w = svg1.selectAll(".lcircs")
    .data(valuesToShow)

  w
    .enter()
    .append("circle")
    .merge(w)
    .transition()
    .duration(1000)
      .attr("cx", xCircle)
      .attr("cy", function(d) {
        return height - size1(d)
      })
      .attr("r", function(d) {
        return +size1(d)
      })
      .style("fill", "none")
      .attr("class", "lcircs")
      .attr("stroke", "black")

  var w1 = svg1.selectAll(".llines")
    .data(valuesToShow)
  w1
    .enter()
    .append("line")
    .merge(w1)
    .transition()
    .duration(1000)
      .attr('x1', function(d) {
        return xCircle + size1(d)
      })
      .attr('x2', xLabel+5)
      .attr('y1', function(d) {
        return height - size1(d)
      })
      .attr('y2', function(d) {
        return height - size1(d)
      })
      .attr('stroke', 'black')
      .attr("class", "llines")
      .style('stroke-dasharray', ('2,2'))

  var w2 = svg1.selectAll(".llabels")
    .data(valuesToShow)

  w2
    .enter()
    .append("text")
    .merge(w2)
    .transition()
    .duration(1000)
      .attr('x', xLabel)
      .attr('y', function(d){
        return height - size1(d)
      })
      .attr("class", "llabels")
      .text( function(d){
        return d
      })
      .style("font-size", 10)
      .attr('alignment-baseline', 'middle')



  d3.csv("graph_3v2.csv", function(data) {
    var valueExtent = d3.extent(data, function(d) {
      return +d[selectedVar];
    })
    var size = d3.scaleSqrt()
      .domain(valueExtent)
      .range([ 1, 50]);


      let color = d3.scaleOrdinal()
          .range(d3.quantize(d3.interpolateHcl("#66a0e2", "pink"), 150));


    var u = svg1.selectAll(".circ")
      .data(data)

    u
      .enter()
      .append("circle")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("r", function(d) {
        return size(+d[selectedVar])
      })
      .attr("cx", function(d) {
        return projection([+d.homelon, +d.homelat])[0]
      })
      .attr("cy", function(d) {
        return projection([+d.homelon, +d.homelat])[1]
      })
      .attr("class", "circ")
      .style("fill", "goldenrod")
      .attr("fill-opacity", .4)
      .attr("stroke", function(d) {
        if(d[selectedVar]>2000){
          return "black"
        } else {
          return "none"
        }
      })
      .attr("stroke-width", 1)

  })
}


update2('Value')
