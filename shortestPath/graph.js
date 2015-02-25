(function() {
  'use strict';

  var fs = require('fs');
  var inputText;
  var inputArray;
  var inputGraph;

  /******************************************************************************
 * Graph class will just be a simple JS object (dictionary) mapping node names
 * to the corresponding node object, which contains an array of neighbors.  
 * Graph is undirected.
 *****************************************************************************/
  var Graph = function() {

  };

/******************************************************************************
 * Nodes have a neighbors object mapping neighbor names to edge weights
 *****************************************************************************/
  var Node = function(name) {
    this.name = name;
    this.neighbors = {};
  };



/******************************************************************************
 * Read in the input file
 *****************************************************************************/
inputGraph = new Graph();

inputText = fs.readFileSync(__dirname + '/data.txt', {encoding: 'utf8'});
inputArray = inputText.split('\n');

inputArray.forEach(function(line) {
  var lineArr = line.trim().split('\t');

  // First entry is the node we are building up
  var currentNodeName = lineArr.shift();
  var currentNode = new Node(currentNodeName);

  lineArr.forEach(function(touple) {

    var neighborArr = touple.split(',');
    var neighbor = neighborArr[0];
    var weight = parseInt(neighborArr[1]);

    // Add to current node's neighbor list
    // Even though graph is undirected, our input file defines an edge from 
    // a -> b and from b -> a so we don't need to include any special logic
    // to maintain this relationship
    currentNode.neighbors[neighbor] = weight;

  });

  inputGraph[currentNodeName] = currentNode;


});





/******************************************************************************
 * Expose the built up graph
 *****************************************************************************/
module.exports = {
  graph: inputGraph
};

})();