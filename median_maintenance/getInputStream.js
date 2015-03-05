(function() {
  'use strict';

  var fs = require('fs');

  /******************************************************************************
   * Stream class exposes a .next() method.  Has private array that it reverses
   * so it can pop rather than unshift for each call of .next()
   *****************************************************************************/
  var inputStream = function(arr) {
    var _storage = arr.slice().reverse();

    this.next = function() {
      return _storage.pop();
    };

    this.hasNext = function() {
      return !!_storage.length;
    };

  };



  var inputText = fs.readFileSync(__dirname + '/input.txt', {encoding: 'utf8'});
  var inputArray = inputText.trim().split('\n').map(function(str) {
    return parseInt(str);
  });

  // var testArray = [4,5,6,7,8,9,10,1,2,3]; // Should be 54

  module.exports = new inputStream(inputArray);
  // module.exports = new inputStream(testArray);


})();