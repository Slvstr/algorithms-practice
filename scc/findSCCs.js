(function() {
  'use strict';

  var graph = require('./graph').Graph;
  var reversedGraph = require('./graph').ReversedGraph;


  var findSCCs = function(graph, reversedGraph) {

    var SCCs = {};
    var firstNodeList = Object.keys(reversedGraph);
    var finishingList = [];


    var DFS = function(graph, startNodeName, round) {
      
      // Mark node as visited
      graph[startNodeName].visited = true;

      // Only work on SCCs on second round of DFSLoop
      if (round === 2) {
        SCCs[leader].push(startNodeName);
      }

      // Recursively call DFS on all unvisited neighbors of the current node
      if (graph[startNodeName].neighbors.length) {
        graph[startNodeName].neighbors.forEach(function(neighbor) {
          if (!(graph[neighbor].visited)) {
            process.nextTick(DFS(graph, neighbor, round));
          }
        });  
      }

      // Only work on finishingList on first round of DFSLoop
      if (round === 1) {
        finishingList.push(startNodeName);
      }

    };


    var DFSLoop = function(graph, nodeList, round) {
      var currentNode;
      var leader;

      // Process nodeList in reverse order.  This is because finishingList is in ascending order
      for (var i=nodeList.length-1; i>=0; i--) {
        currentNode = nodeList[i];

        if (!graph[currentNode].visited) {
          leader = currentNode;
          DFS(graph, currentNode, round);
        }
      }
    };


    DFSLoop(reversedGraph, firstNodeList, 1);
    DFSLoop(graph, finishingList, 2);

    return SCCs;

  };


var results = findSCCs(graph, reversedGraph);
console.log(Object.keys(results).length);



})();