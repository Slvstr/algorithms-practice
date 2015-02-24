(function() {
  'use strict';

  var graph = require('./graph').Graph;
  var reversedGraph = require('./graph').ReversedGraph;



  var findSCCs = function(graph, reversedGraph) {
    var SCCs = {};
    var firstNodeList = Object.keys(reversedGraph);
    var finishingList = [];


    var DFS = function(graph, startNodeName, round, leader) {

      var stack = [];
      var fullStack = [];
      var currentNodeName;
      var currentNode;
      var neighbor;
      var offset = 0;
      graph[startNodeName].visited = true;
      stack.push(startNodeName);


      while (stack.length) {
        currentNodeName = stack.pop();
        currentNode = graph[currentNodeName];
        fullStack.push(currentNodeName);

        for (var i = 0, len=currentNode.neighbors.length; i < len; i++) {
          neighbor = graph[currentNode.neighbors[i]];
          if (neighbor && !neighbor.visited) {
            neighbor.visited = true;
            stack.push(currentNode.neighbors[i]);       
          }
        }

      }


      while (fullStack.length) {
        currentNodeName = fullStack.pop();


        // Only work on SCCs on second round of DFSLoop
        if (round === 2) {
          SCCs[leader] = SCCs[leader] || [];
          SCCs[leader].push(currentNodeName);
        }

        // Only work on finishingList on first round of DFSLoop
        if (round === 1) {
          finishingList.push(currentNodeName);
        }


        
      }

      
    };


    var DFSLoop = function(graph, nodeList, round) {
      var currentNode;
      var leader;

      for (var i=nodeList.length-1; i>=0; i--) {
        currentNode = nodeList[i];

        if (!graph[currentNode].visited) {
          leader = (round === 2 ? currentNode : undefined);
          DFS(graph, currentNode, round, leader);
        }
      }
    };




    DFSLoop(reversedGraph, firstNodeList, 1);
    reversedGraph = null;
    firstNodeList = null;
    console.log('finished first loop');
    DFSLoop(graph, finishingList, 2);
    graph = null;
    finishingList = null;

    console.log('finished 2nd loop');

    return SCCs;

  };


var results = findSCCs(graph, reversedGraph);
var SCCLengths = Object.keys(results).map(function(scc) {
  return results[scc].length;
});

var sortedLengths = SCCLengths.sort(function(a, b) {
  return b-a; 
});

console.log(sortedLengths.slice(0,5));


})();