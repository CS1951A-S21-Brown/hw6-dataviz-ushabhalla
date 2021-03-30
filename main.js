// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin1 = {top: 40, right: 100, bottom: 40, left: 60};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 40},
  width = 700 - margin.left - margin.right,
  height = 400 - margin.top/3 - margin.bottom;



// connected scatter plot with tooltip
var create_graph1 = function() {


  var svg = d3.select("#graph1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin1.left + "," + margin.top + ")");

  d3.csv("graph_1.csv",

    function(d){
      return {
        date : d3.timeParse("%Y")(d.date),
        value : d.value
      }
    },

    function(data) {
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) {
          return d.date;
        }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      svg.append("text")
        .attr("transform",
              "translate(" + (width/2) + " ," +
                             (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .attr("id", "graph1_xlabel")
        .text("Year");

      var y = d3.scaleLinear()
        .domain( [0, 1400])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x",0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .attr("id", "graph1_ylabel")
        .style("text-anchor", "middle")
        .text("Number of Games");


      svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Number of Games Per Year");

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .curve(d3.curveBasis)
          .x(function(d) {
            return x(d.date)
          })
          .y(function(d) {
            return y(d.value)
          })
        );


      // tooltip
      var Tooltip = d3.select("#graph1")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

        var mouseover = function(d) {
          Tooltip
            .style("opacity", 1)
        };
        var mousemove = function(d) {
          Tooltip
            .html(d.value + " games in " +d.date.getFullYear() )
            .style("left", (d3.mouse(this)[0]+30) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
        };
        var mouseleave = function(d) {
          Tooltip
            .style("opacity", 0)
        };

        let color = d3.scaleOrdinal()
            .range(d3.quantize(d3.interpolateHcl("#66a0e2", "pink"), 150));

      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "myCircle")
          .attr("cx", function(d) {
            return x(d.date)
          })
          .attr("cy", function(d) {
            return y(d.value)
          })
          .attr("r", 4)
          .attr("stroke", function(d) {
            return color(d.value)
          })
          .attr("stroke-width", 3)
          .attr("fill", "white")
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
  });


};


var create_graph2 = function() {
  var svg = d3.select("#graph2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("graph_2.csv", function(data) {

    data.sort(function(b, a) {
      return a.Value - b.Value;
    });

    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) {
        return d.Country;
      }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 20) + ")")
      .attr("id", "graph2_xlabel")
      .style("text-anchor", "middle")
      .text("Country");

    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Top Winning Nations");

    var y = d3.scaleLinear()
      .domain([0, 1])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    let color = d3.scaleOrdinal()
        .range(d3.quantize(d3.interpolateHcl("#66a0e2", "pink"), 7));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("id", "graph2_ylabel")
      .style("text-anchor", "middle")
      .text("Percent Wins");

    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) {
          return x(d.Country);
        })
        .attr("y", function(d) {
          return y(d.Value);
        })
        .attr("fill", function(d) {
          return color(d.Value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          return height - y(d.Value);
        })

  });
};



create_graph1();
create_graph2();
