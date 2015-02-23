/******************************************************************************
 * Graph Class - Uses Adjacency Lists to represent graphs
 *****************************************************************************/

 var Node = function(name) {
  this.name = name;
  this.edges = [];
 };


 Node.prototype.isSelf = function(otherNode) {
   return this.mergeID === otherNode.mergeID;
 };


  Node.prototype.getRandomEdge = function() {
  var randomIndex = Math.floor(Math.random() * this.edges.length);
  var randomEdge = this.edges.splice(randomIndex, 1)[0];
  // console.log('choosing random edge at index' + randomIndex + '=> ' + randomEdge);
  return randomEdge;
 };

 // Deletes edges that point to the same node on either side
 Node.prototype.deleteSelfLoops = function() {
   this.edges = this.edges.filter(function(edge) {
    return !(edge.from.isSelf(edge.to));
   });
 };



 var Edge = function(fromNode, toNode) {
  this.from = fromNode;
  this.to = toNode;
 };

 var Graph = function(copyFrom) {

    this.nodes = [];
    this.edges = [];  
 };

Graph.prototype.copy = function() {
  var newGraph = new Graph();

  newGraph.nodes = this.nodes.map(function(node) {
    return newGraph.getNode(node.name);
  });

  newGraph.edges = this.edges.map(function(edge) {
    var node1 = newGraph.getNode(edge.from.name);
    var node2 = newGraph.getNode(edge.to.name);
    var newEdge = new Edge(node1, node2);
    return newEdge;
  });

  return newGraph;
};

 Graph.prototype.addNode = function(node) {
   this.nodes.push(node);
 };

 Graph.prototype.addEdge = function(edge) {
   this.edges.push(edge);
 };

 Graph.prototype.hasNode = function(nodeName) {
   return this.nodes.reduce(function(accumulator, node) {
    return (accumulator || node.name === nodeName);
   }, false);
 };

// getNode(nodeName) will retrieve a reference to an existing node or create a new node and add it to its collection of nodes
// Typically these would be separate functions, for greater separation of concerns and greater flexibility for users
 Graph.prototype.getNode = function(nodeName) {
   if (this.hasNode(nodeName)) {
     return this.nodes.filter(function(node) {
      return node.name === nodeName;
     })[0];    
   }
   else {
    var node = new Node(nodeName);
    this.addNode(node);
    return node;
   }
 };

 Graph.prototype.getRandomNode = function() {
   var randomIndex = Math.floor(Math.random() * this.nodes.length);
   var randomNode = this.nodes[randomIndex];
   return randomNode;
 };



module.exports = {
  Node: Node,
  Edge: Edge,
  Graph: Graph
};