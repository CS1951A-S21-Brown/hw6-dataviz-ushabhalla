// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin1 = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#graph1")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var create_list = function(obj) {
  // console.log(obj.toString());
  var arr = [];
  for (var i = 1872; i <2021; i++) {
    // console.log(obj[2020]);
    arr.push(
      {"key": i,
       "val":obj[toString(i)]}
    );
  };
  // console.log(arr);
  return arr;
};

var create_yrdict = function() {
  var years = [];
  var dict = {};
  d3.csv("data/football.csv", function(data) {
    // console.log(data);
    var yr = data.date.slice(0,4);
    if (!(yr in dict)) {
      dict[yr]=1;
    }
    else {
      dict[yr] = dict[yr]+1;
    }
  });
  // console.log(Object.keys(dict));

  var years = create_list(dict);
  // for (yr in Object.keys(dict)) {
  //   console.log("hi");
  //   years.push(
  //     {"yr": yr,
  //      "games":dict[yr]}
  //   );
  // };
  // console.log(dict);
  return years;
};

var create_windict = function() {
  var dict = {};
  d3.csv("data/football.csv", function(data) {
    // console.log(data);
    // var yr = data.date.slice(0,5);
    if (data.home_score > data.away_score) {
      if (!(data.home_team in dict)) {
        dict[data.home_team] = {};
        dict[data.home_team]["wins"]=1;
        dict[data.home_team]["losses"]=0;
      } else {
        dict[data.home_team]["wins"]++;
      }

      if (!(data.away_team in dict)) {
        dict[data.away_team] = {};
        dict[data.away_team]["wins"]=0;
        dict[data.away_team]["losses"]=1;
      } else {
        dict[data.away_team]["losses"]++;
      }
    } else {
      if (!(data.home_team in dict)) {
        dict[data.home_team] = {};
        dict[data.home_team]["wins"]=0;
        dict[data.home_team]["losses"]=1;
      } else {
        dict[data.home_team]["losses"]++;
      }

      if (!(data.away_team in dict)) {
        dict[data.away_team] = {};
        dict[data.away_team]["wins"]=1;
        dict[data.away_team]["losses"]=0;
      } else {
        dict[data.away_team]["wins"]++;
      }
    }
  });
  // console.log(dict);
  return dict;
};

var create_wcdict = function() {
  var dict = {};
  d3.csv("data/football.csv", function(data) {
    // console.log(data);
    var yr = data.date.slice(0,4);
    // console.log(yr);
    if  ((yr == "2019") || (yr == "2020")) {
      var tourn = data.tournament;
      // console.log(tourn);
      if (tourn == "FIFA World Cup qualification") {
        if (data.home_score > data.away_score) {
          if (!(data.home_team in dict)) {
            dict[data.home_team] = {};
            dict[data.home_team]["wins"]=1;
            dict[data.home_team]["losses"]=0;
          } else {
            dict[data.home_team]["wins"]++;
          }

          if (!(data.away_team in dict)) {
            dict[data.away_team] = {};
            dict[data.away_team]["wins"]=0;
            dict[data.away_team]["losses"]=1;
          } else {
            dict[data.away_team]["losses"]++;
          }
        } else {
          if (!(data.home_team in dict)) {
            dict[data.home_team] = {};
            dict[data.home_team]["wins"]=0;
            dict[data.home_team]["losses"]=1;
          } else {
            dict[data.home_team]["losses"]++;
          }

          if (!(data.away_team in dict)) {
            dict[data.away_team] = {};
            dict[data.away_team]["wins"]=1;
            dict[data.away_team]["losses"]=0;
          } else {
            dict[data.away_team]["wins"]++;
          }
        }
      }
    }
  });
  // console.log(dict);
  return dict;
};


// connected scatter plot with tooltip
var create_graph1 = function() {


  var svg = d3.select("#graph1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv",

    // When reading the csv, I must format variables:
    function(d){
      return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
    },

    // Now I can use this dataset:
    function(data) {

      // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain( [8000, 9200])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .curve(d3.curveBasis) // Just add that to have a curve instead of segments
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })
        );

      // create a tooltip
      var Tooltip = d3.select("#graph1")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
          Tooltip
            .style("opacity", 1)
        };
        var mousemove = function(d) {
          Tooltip
            .html("Exact value: " + d.value)
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
        };
        var mouseleave = function(d) {
          Tooltip
            .style("opacity", 0)
        };

      // Add the points
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "myCircle")
          .attr("cx", function(d) { return x(d.date) } )
          .attr("cy", function(d) { return y(d.value) } )
          .attr("r", 8)
          .attr("stroke", "#69b3a2")
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

  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

    // sort data
    data.sort(function(b, a) {
      return a.Value - b.Value;
    });

    // X axis
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d) { return d.Country; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 13000])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.Country); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#69b3a2")

  });
};


var create_graph3 = function() {
  // The svg
  var svg = d3.select("#graph3"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

  // Map and projection
  var projection = d3.geoMercator()
      .scale(350) // This is the zoom
      .translate([850, 440]); // You have to play with these values to center your map

  // Path generator
  var path = d3.geoPath()
      .projection(projection)

  // Load external data and boot
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json", function(data){

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "#69a2a2")
            .attr("d", path)
            .attr("stroke", "white")

    // Add the labels
    svg.append("g")
        .selectAll("labels")
        .data(data.features)
        .enter()
        .append("text")
          .attr("x", function(d){return path.centroid(d)[0]})
          .attr("y", function(d){return path.centroid(d)[1]})
          .text(function(d){ return d.properties.iso3166_2})
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "central")
          .style("font-size", 11)
          .style("fill", "white")
  })

};

create_graph1();
create_graph2();
create_graph3();
// var yr_dict = create_yrdict();
// console.log(yr_dict);
// var win_dict = create_windict();
// console.log(win_dict);
// var wc_dict = create_wcdict();
// console.log(wc_dict);
