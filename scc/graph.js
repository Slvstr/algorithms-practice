
(function() {
  'use strict';
  var _ = require('lodash');

/******************************************************************************
 * Graph class will just be a simple JS object (dictionary) mapping node names
 * to an array of their neighbors
 *****************************************************************************/
  var Graph = function() {

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
    var edge = line.trim().split(' ');
    var from = edge[0];
    var to = edge[1];

    // Every node gets a key, even if it has no neighbors
    originalGraph[from] = (originalGraph[from] ? originalGraph[from] : []);
    originalGraph[to] = (originalGraph[to] ? originalGraph[to] : []);

    originalGraph[from].push(to);

  });

/******************************************************************************
 * Generate reversed graph
 *****************************************************************************/

reversedGraph = new Graph();


_.forIn(originalGraph, function(neighbors, node) {
  if (!Array.isArray(neighbors)) console.log('unexpected key in originalGraph : ' + node);

  reversedGraph[node] = reversedGraph[node] || [];

  // Add node to reversed graph neighbor list of each of it's original neighbors
  if (!neighbors.length) return;
  neighbors.forEach(function(neighbor) {
    reversedGraph[neighbor] = reversedGraph[neighbor] || [];
    reversedGraph[neighbor].push(node);
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

