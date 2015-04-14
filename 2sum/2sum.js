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

  console.log(inputArray.length);

  var total,
      x,
      y;


  for (var i = -10000; i <= 10000; i++) {
    for (var j = 0; j < inputArray.length; j++) {
      x = inputArray[j];
      y = i - x;

      if (x > 10000) {
        break;
      }

      if (hash[y] !== undefined && x !== y) {
        resultSet[i] = i;
        break;
      }
    }
  }

  console.log(Object.keys(resultSet).length);

  // var x;
  // var y;
  // var total;
  // var yLow;
  // var yHigh;
  // var yLowIndex;
  // var yHighIndex;


  // var findIndex = function(target, low, high, options) {

  //   if ((high - low) <= 1) {
  //     if (options.mode === 'low') {
  //       return low;
  //     }
  //     else if (options.mode === 'high') {
  //       return high;
  //     }
  //   }

  //   var mid = Math.floor((high - low)/2) + low;
  //   var midValue = inputArray[mid];


  //   if (target === midValue) {
  //     return mid;
  //     console.log('target was mid');
  //   }


  //   if (target < midValue) {
  //     return findIndex(target, low, mid, options);
  //   }

  //   if (target > midValue) {
  //     return findIndex(target, mid+1, high, options);
  //   }



  // }




  // // Might have to use hash to get rid of duplicates, but for now just going with the array for performace
  // for( var i = 0, len = inputArray.length; i < len; i++ ) {
  //   x = inputArray[i];
  //   yLow = -10000 - x;
  //   yHigh = 10000-x;


  //   // get start index of yLow
  //   yLowIndex = findIndex(yLow, 0, len, {mode: 'low'});

  //   // get start index of yHigh
  //   yHighIndex = findIndex(yHigh, 0, len, {mode: 'high'});

  //   // generate sums and store in resultSet
  //   for (var j = yLowIndex; j < yHighIndex; j++) {
  //     y = inputArray[j];
  //     total = x + y;
  //     // console.log(total);

  //     if (Math.abs(total) <= 10000 && typeof total === 'number') {
  //       resultSet[total] = total;
  //     }

  //   }
  // }


  // // report resultSet.length
  // Object.keys(resultSet).forEach(function(total) {
  //   console.log(total);
  // });
  // console.log('result: ' + Object.keys(resultSet).length);


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
