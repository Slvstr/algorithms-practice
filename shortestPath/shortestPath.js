(function() {
  'use strict';


  // Load the graph from the given text file
  var graph = require('./graph').graph;

  // Vertices to report shortest paths for, as specified by the assignment instructions
  var verticesToReport = ['7','37','59','82','99','115','133','165','188','197'];
  // var verticesToReport = ['10','30','50','80','90','110','130','160','180','190'];

  var startVertex = '1';


  /******************************************************************************
   * Generate the results
   *****************************************************************************/
  var shortestPaths = computeShortestPaths(graph, startVertex);

  var results = verticesToReport.map(function(vertex) {
    return shortestPaths[vertex];
  });

  console.log(results.join(','));





  /******************************************************************************
   * Begin function definitions
   *****************************************************************************/
  function computeShortestPaths(graph, startVertex) {

    // Set of vertices that have been processed, initialized with start vertex
    // This will map node names to their shortest path
    var completed = {};
    completed[startVertex] = 0;
    graph[startVertex].greedyScore = 0;


    /******************************************************************************
    * Using heap npm module to implement heap version of Dijkstra's Shortest
    * Path Algorithm
    *****************************************************************************/
    var Heap = require('heap');
    var remaining = new Heap(compareWeights);

    // Initialize remaining with start vertex
    remaining.push(graph[startVertex]);

    // checkRemaining will allow us to see if a node exists in the heap already in
    // linear time.  This is necessary since Heap doesn't give us this functionality
    var checkRemaining = {};

    // Next node to be added to completed set
    var next;


    /******************************************************************************
     * Main while loop
     *****************************************************************************/
    
    // Keep going until heap is empty
    while (remaining.size()) {
      
      next = extractMin();
      completed[next.name] = next.greedyScore;
      addNeighborsToHeap(next);

    } 

    return completed;

    /******************************************************************************
     * Get the next node off the heap.  This is the next node to add to completed
     *****************************************************************************/

    function extractMin() {
      var min = remaining.pop();
      delete checkRemaining[min.name];

      return min;
    }

    /******************************************************************************
     * When adding a new node to completed, we add/update all it's neighbors in the 
     * remaining heap.
     *****************************************************************************/

    function addNeighborsToHeap(fromNode) {
      for (var neighbor in fromNode.neighbors) {
        if (!completed.hasOwnProperty(neighbor)) {
          addToHeap(fromNode, graph[neighbor]);
        }
      }
    }

    function addToHeap(fromNode, toNode) {

      // First need to set/update greedy score
      setGreedyScore(fromNode, toNode);

      // If to-node isn't in the heap, add it
      if (!checkRemaining.hasOwnProperty(toNode.name)) {
        remaining.push(toNode);
        checkRemaining[toNode.name] = true;
      }

      // Otherwise just tell the heap to update its position
      else {
        remaining.updateItem(toNode);
      }

    }


    /******************************************************************************
     * Compare function to pass to Heap constructor so heap is ordered by weights
     *****************************************************************************/
    function compareWeights(vertex1, vertex2) {
      return vertex1.greedyScore - vertex2.greedyScore;
    }

    /******************************************************************************
     * Get Greedy Score for an individual vertex
     *****************************************************************************/
    function setGreedyScore(fromNode, toNode) {
      // Compute greedy score for edge fromNode -> toNode
      var fromToScore = completed[fromNode.name] + fromNode.neighbors[toNode.name]; 

      // New greedy score is min of old greedy score and fromToScore
      toNode.greedyScore = toNode.greedyScore === undefined
                         ? fromToScore
                         : Math.min(toNode.greedyScore, fromToScore);
    }

  }

})();