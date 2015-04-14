(function() {
  'use strict';

  var _ = require('lodash');
  var fs = require('fs');
  var cp = require('child_process');


  var children = [];
  var completedChildren = 0;
  var NUMBER_OF_CHUNKS = 10;

  var resultSet = {};
  var hash = {};


  var inputText = fs.readFileSync(__dirname + '/input.txt', {encoding: 'utf8'});
  var inputArray = inputText.split('\n');
  inputArray.pop();


  inputArray = inputArray.map(function(str) {
    var num = parseInt(str);
    hash[num] = num;


    return num;
  }).sort();

 
  process.env.inputArray = inputArray;
  process.env.hash = hash;
  process.env.chunkSize = Math.ceil(inputArray.length / NUMBER_OF_CHUNKS);
  process.env.chunkNumber = 0

  var child;
  var childFileName = __dirname + '/processChunk.js';

  // for (var i = 0; i < NUMBER_OF_CHUNKS; i++) {
    child = cp.fork('./processChunk');


    child.on('message', function(result) {
      var total = result.toString().trim();
      console.log('total ' + total);
      resultSet[total] = total;
    });

    child.on('exit', function() {
      completedChildren++;

      if (completedChildren === NUMBER_OF_CHUNKS) {
        console.log('result: ' + Object.keys(resultSet).length);
      }
    });



    children.push(child);
    process.env.chunkNumber += 1;

  // }






})(); 