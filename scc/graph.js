
(function() {
  'use strict';
  var _ = require('lodash');

/******************************************************************************
 * Graph class will just be a simple JS object (dictionary) mapping node names
 * to an array of their neighbors
 *****************************************************************************/
  var Graph = function() {

  };

  var Node = function() {
    this.neighbors = [];
    this.visited = false;
  };


/******************************************************************************
 * Load the graph from the text file and generate the original graph
 *****************************************************************************/
  var fs = require('fs');
  var originalGraph = new Graph();
  var reversedGraph;

  var inputText = fs.readFileSync(__dirname + '/edges.txt', {encoding: 'utf8'});
  var inputArray = inputText.split('\n');
  inputArray.forEach(function(line) {
    var edge = line.trim().split(/\s+/);
    var from = edge[0];
    var to = edge[1];

    // Every node gets a key, even if it has no neighbors
    originalGraph[from] = (originalGraph[from] ? originalGraph[from] : new Node());
    originalGraph[to] = (originalGraph[to] ? originalGraph[to] : new Node());


    originalGraph[from].neighbors.push(to);

  });

/******************************************************************************
 * Generate reversed graph
 *****************************************************************************/

reversedGraph = new Graph();


_.forIn(originalGraph, function(node, nodeName) {
  if (!Array.isArray(node.neighbors)) throw new Error('unexpected key in originalGraph : ' + nodeName);

  reversedGraph[nodeName] = reversedGraph[nodeName] || new Node();

  // Add node to reversed graph neighbor list of each of it's original neighbors
  if (!node.neighbors.length) return;
  node.neighbors.forEach(function(neighbor) {
    reversedGraph[neighbor] = reversedGraph[neighbor] || new Node();
    reversedGraph[neighbor].neighbors.push(nodeName);
  });
});


/******************************************************************************
 * Expose the original and reversed graphs
 *****************************************************************************/
module.exports = {
  Graph: originalGraph,
  ReversedGraph: reversedGraph
};

})();

