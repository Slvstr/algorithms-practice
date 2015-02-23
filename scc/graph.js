(function() {
  'use strict';

/******************************************************************************
 * Graph class will just be a simple JS object (dictionary) mapping node names
 * to an array of their neighbors
 *****************************************************************************/
  var Graph = function() {

  };

  var fs = require('fs');

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




})();
