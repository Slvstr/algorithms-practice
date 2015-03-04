(function() {
  'use strict';

  var countResult = 0;

  var fs = require('fs');
  var inputText = fs.readFileSync(__dirname + '/input.txt', {encoding: 'utf8'});
  var inputArray = inputText.split('\n');
  inputArray.pop();


  var hash = {};

  // Use resultSet to make sure the same target isn't counted more than once. 
  var resultSet = {};
  // console.log(inputArray.length);

  // console.log(typeof parseInt(inputArray[0]));

  // sort the array so we can use binary search
  inputArray = inputArray.map(function(str) {
    var num = parseInt(str);
    hash[num] = num;

    return num;
  }).sort();

  var x;
  var y;
  var total;
  var yLow;
  var yHigh;
  var yLowIndex;
  var yHighIndex;


  var findIndex = function(value, low, high, options) {

    if ((high - low) <= 1) {
      return (options.mode === 'high' ? high : low);
    }

    var mid = Math.floor((high - low)/2) + low;
    var midValue = inputArray[mid];


    if (value === midValue) {
      return mid;
    }


    if (value < midValue) {
      return findIndex(value, low, mid, options);
    }

    if (value > midValue) {
      return findIndex(value, mid+1, high, options);
    }



  }

  // Might have to use hash to get rid of duplicates, but for now just going with the array for performace
  for( var i = 0, len = inputArray.length; i < len; i++ ) {
    x = inputArray[i];
    yLow = -10000 - x;
    yHigh = 10000 - x;

    // get start index of yLow
    yLowIndex = findIndex(yLow, i, len, {mode: 'low'});

    // get start index of yHigh
    yHighIndex = findIndex(yHigh, i, len, {mode: 'high'});

    // generate sums and store in resultSet
    for (var j = yLowIndex; j <= yHighIndex; j++) {
      y = inputArray[j];
      total = x + y;

      if (Math.abs(total) <= 10000) {
        resultSet[total] = total;
      }

    }
  }


  // report resultSet.length
  console.log('result: ' + Object.keys(resultSet).length);


  // for(var target = -10000; target <= 10000; target++) {
  //   console.log('in outer loop');
  //   for (var i = 0; i < inputArray.length; i++) {
  //     var x = inputArray[i];
  //     var y = target - x;
  //     var yKey = '' + y;

  //     if (i === 3) {
  //       console.log('x: ' + x);
  //       console.log('y: ' + y);
  //       console.log('target: ' + target);
  //       console.log('count: ' + countResult);
  //     }

  //     if (hash[y]) {
  //       countResult++;
  //       break;
  //     }
  //   }
  // }


  // console.log('result: ' + countResult);
  

})();
