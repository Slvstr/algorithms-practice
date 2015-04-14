/******************************************************************************
 * Find the minimum cut of a graph
 *****************************************************************************/

// Could try not doing it sequentially by creating a merged node id, and incrementing it each time you mege
// two non-merged nodes.  Merging two merged nodes gets one of the id's.  Deleting self loops looks for 
// two merged nodes with the same merge id.  findCut could get the last edge that currentEdge referenced


var Node = require('./Graph').Node;
var Edge = require('./Graph').Edge;
var Graph = require('./Graph').Graph;
var fs = require('fs');
var util = require('util');

// Initialize the graph
var baseGraph = new Graph();
var edgeCount = 0

// Populate the graph
var inputText = fs.readFileSync(__dirname + '/kargerMinCut.txt', {encoding: 'utf8'});
var inputArray = inputText.split('\n');
inputArray.forEach(function(line) {
  line = line.trim();
  var lineArr = line.split('\t');
  var nodeName = lineArr.shift();
  edgeCount += lineArr.length;
  var node = baseGraph.getNode(nodeName);
  
  lineArr.forEach(function(edgeNodeName) {
    var edgeNode = baseGraph.getNode(edgeNodeName);
    var edge = new Edge(node, edgeNode);
    baseGraph.addEdge(edge);
  });

});

console.log('Edge count is ' + edgeCount);

var getRandomEdge = function(graph) {
  var randomIndex = Math.floor(Math.random() * graph.edges.length);
  console.log('graph has ' + graph.edges.length + 'edges left');
  console.log('Attempting to splice edge at index ' + randomIndex);
  var randomEdge = graph.edges.splice(randomIndex, 1)[0];
  return randomEdge;
};

var deleteSelfLoops = function(graph) {
  graph.edges = graph.edges.filter(function(edge) {
    if (edge.from.mergeID !== undefined && edge.to.mergeID !== undefined) {
      return !(edge.from.mergeID === edge.to.mergeID);
    }
    return true;
  });
};

var updateMergeIDs = function(graph, oldID, newID) {
  graph.nodes.forEach(function(node) {
    if (node.mergeID === oldID) {
      node.mergeID = newID;
    }
  });
};

var mergeEdge = function(edge, graph, mergeID) {
  // If neither have been merged
  if (edge.from.mergeID === undefined && edge.to.mergeID === undefined) {
    edge.from.mergeID = mergeID;
    edge.to.mergeID = mergeID;
    return;
  }
  else if (edge.from.mergeID === undefined) {
    updateMergeIDs(graph, edge.to.mergeID, mergeID);
    edge.from.mergeID = mergeID;
    return;
  }
  else if (edge.to.mergeID === undefined) {
    updateMergeIDs(graph, edge.from.mergeID, mergeID);
    edge.to.mergeID = mergeID;
    return;
  }
  else {
    updateMergeIDs(graph, edge.from.mergeID, mergeID);
    updateMergeIDs(graph, edge.to.mergeID, mergeID);
    return;
  }

};



var findCut = function(graph) {

  var currentEdge;
  var result = {};
  var mergeID = 0;
  // console.log('graph has ' + graph.nodes.length + ' nodes');

  for (var i = 0; i < graph.nodes.length - 2; i++) {
    // getRandomEdge takes care of selecting the edge and removing it from the graph
    currentEdge = getRandomEdge(graph);
    mergeEdge(currentEdge, graph, ++mergeID);
    deleteSelfLoops(graph);
  }


  result.edges = graph.edges;
  result.cuts = graph.edges.length;
  // console.log(result.cuts);
  // console.log(util.inspect(graph, false, null));

  return result;
};


// var testBaseGraph = new Graph();

// var node1 = new Node('1');
// var node2 = new Node('2');
// var node3 = new Node('3');
// var node4 = new Node('4');


// var edge1 = new Edge(node1, node2);
// var edge2 = new Edge(node1, node3);
// var edge3 = new Edge(node2, node1);
// var edge4 = new Edge(node2, node3);
// var edge5 = new Edge(node2, node4);
// var edge6 = new Edge(node3, node1);
// var edge7 = new Edge(node3, node2);
// var edge8 = new Edge(node3, node4);
// var edge9 = new Edge(node4, node2);
// var edge10 = new Edge(node4, node3);

// node1.edges.push(edge1);
// node1.edges.push(edge2);
// node2.edges.push(edge3);
// node2.edges.push(edge4);
// node2.edges.push(edge5);
// node3.edges.push(edge6);
// node3.edges.push(edge7);
// node3.edges.push(edge8);
// node4.edges.push(edge9);
// node4.edges.push(edge10);

// testBaseGraph.addNode(node1);
// testBaseGraph.addNode(node2);
// testBaseGraph.addNode(node3);
// testBaseGraph.addNode(node4);

// testBaseGraph.addEdge(edge1);
// testBaseGraph.addEdge(edge2);
// testBaseGraph.addEdge(edge3);
// testBaseGraph.addEdge(edge4);
// testBaseGraph.addEdge(edge5);
// testBaseGraph.addEdge(edge6);
// testBaseGraph.addEdge(edge7);
// testBaseGraph.addEdge(edge8);
// testBaseGraph.addEdge(edge9);
// testBaseGraph.addEdge(edge10);

// var testGraph = testBaseGraph.copy();


var findMinCut = function(graph) {
  var minCut = {};
  minCut.cuts = graph.edges.length;
  console.log('edge length ' + graph.edges.length);
  minCut.edges = graph.edges.slice();

  var currentCut;
  var freshGraph;
  var numNodes = graph.nodes.length;
  var ITERATIONS_REQUIRED = numNodes * Math.log(numNodes);

  for (var i=0; i<ITERATIONS_REQUIRED; i++) {
    freshGraph = graph.copy();
    currentCut = findCut(freshGraph);
    if (currentCut.cuts < minCut.cuts) {
      minCut = currentCut;
    }
  }

  return minCut;
};

// var testResult = findCut(testBaseGraph);
// console.log(testResult.cuts);
  // var testMinCut = findMinCut(testBaseGraph);
  // console.log(testMinCut.cuts);

var answer = findMinCut(baseGraph);
console.dir(answer.cuts);