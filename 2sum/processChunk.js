module.exports = (function() {
  'use strict';

  process.send('In child process');
  var inputArray = process.env.inputArray;
  var hash = process.env.hash;


  var chunkNumber = parseInt(process.argv[2]);
  var chunkSize = process.env.chunkSize;
  var offset = chunkSize * chunkNumber;
  var endIndex = offset + chunkSize;

  var x;
  var y;



  for (var i = -10000; i <= 10000; i++) {
    for (var j = offset; j < endIndex; j++) {
      x = inputArray[j];
      y = i - x;

      if (x > 10000) {
        break;
      }

      if (hash[y] !== undefined && x !== y) {
        process.send(i);
        break;
      }
    }
  }


})();