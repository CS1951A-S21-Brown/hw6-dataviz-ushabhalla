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



var nodes_fun = function(nodes_arr) {
  // console.log(nodes_arr);
  console.log(Array.from(nodes_arr.values()));
  var id=0;
  var nodes1 = [];

  nodes_arr.forEach(function (value) {
    id++;
    console.log(value);
    nodes1.push({
      "id": id,
      "name": value
    });

  });
  console.log(nodes1);
  // for (id = 0; id < 27406; id++) {
  //   console.log(nodes_arr[id]);
  //   nodes1.push({
  //     "id": id,
  //     "name": nodes_arr[id].value
  //   });
  // };
  return nodes1;
};

function create_nodes() {
  // code to be executed
  var nodes_arr = new Set();
  var links_arr = [];
  var s = 0;
  d3.csv("data/netflix.csv", function(data) {
    var nodes1 = data.cast.split(", ");
    for (var i = 0; i < nodes1.length; i++) {
      nodes_arr.add(nodes1[i]);
    };
  });



  console.log(nodes_arr);
  var nodes;
  nodes = nodes_fun(nodes_arr);
  console.log(nodes);
  return nodes;
};

var nodes = create_nodes();




// var unique_nodes = [...new Set(nodes_arr)];
// var nodes = [];
// var id;
// console.log(s);
// for (id = 0; id < s; id++) {
//   console.log(id);
//   nodes.push({
//     "id": id,
//     "name": nodes[id]
//   });
// };
// console.log(nodes);
// console.log("hello");
// var nodes = unique_nodes.map(function(n) {
//     console.log(n)
//     id++
//     return {
//       "id": id,
//       "name": n
//     }
// });
console.log(nodes);
var links =[];

var id = 0;
// d3.csv("data/netflix.csv", function(data) {
//   // console.log(data.cast);
//   var nodes1 = data.cast.split(", ");
//   var nodes = [];
//   const len = nodes.length;
//   // console.log(len);
//   var i;
//   for (i = 0; i < nodes1.length; i++) {
//     console.log(i+len);
//     id = id + 1;
//     nodes.push({
//       "id": id,
//       "name": nodes1[i]
//     });
//
//     var j;
//     for (j=i; j < nodes1.length; j++) {
//       links.push({
//       "source": i + len,
//       "target": i + len + j
//     });
//     console.log(links);
//     };
//
//   };
//
//   // var i;
//   // for (i = 0; i < nodes1.length; i++) {
//   //   // console.log(nodes[i]);
//   //   var j;
//   //   for (j=i; i < nodes1.length; i++) {
//   //     links.push({
//   //     "source": nodes1[i],
//   //     "target": nodes1[j]
//   //   });
//   //   // console.log(links);
//   //   };
//   // };
//   console.log(links);
//   // d3.csv("data/netflix.csv", function( data) {
//
//   // Initialize the links
//   var link = svg
//     .selectAll("line")
//     .data(links)
//     .enter()
//     .append("line")
//       .style("stroke", "#aaa")
//   console.log("done2");
//   // Initialize the nodes
//   var node = svg
//     .selectAll("circle")
//     .data(nodes)
//     .enter()
//     .append("circle")
//       .attr("r", 20)
//       .style("fill", "#69b3a2")
//   console.log("done4");
//   // // Let's list the force we wanna apply on the network
//   var simulation = d3.forceSimulation(nodes)                 // Force algorithm is applied to data.nodes
//       .force("link", d3.forceLink()                               // This force provides links between nodes
//             .id(function(d) { return d.id; })                     // This provide  the id of a node
//             .links(links)                                    // and this the list of links
//       )
//       .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
//       .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
//       .on("end", ticked);
//   console.log("done3");
//   // This function is run at each iteration of the force algorithm, updating the nodes position.
//   function ticked() {
//     link
//         .attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; });
//
//     node
//          .attr("cx", function (d) { return d.x+6; })
//          .attr("cy", function(d) { return d.y-6; });
//   }
//
// });
// console.log("hi");
