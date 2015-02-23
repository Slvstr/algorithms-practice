var fs = require('fs');
var split = require('split');


/******************************************************************************
 * Implement algorithm to count # of inversions in a given input array
 *****************************************************************************/



 // Recursive Strategy:
 // Split the array
 // Count Left inversions
 // Count Right inversions
 // Count Split inversions ** This is where all the work happens

var countSplitInversions = function(original, left, right) {
  var i = 0;
  var j = 0;
  var inversions = 0;

  while(i < left.length || j < right.length) {
    if (i === left.length) {
      original[i+j] = right[j++];
    }
    else if (j === right.length) {
      original[i+j] = left[i++];
    }
    else if (left[i] === right[i]) {
      original[i+j] = left[i++];
      original[i+j] = right[j++];

    }
    else if (left[i] > right[j]) {
      original[i+j] = right[j++];
      inversions+= left.length-i;
    }
    else {
      original[i+j] = left[i++];
    }
  }

  return inversions;
};

var countInversions = function(arr) {
  if (arr.length < 2) {
    return 0;
  }

  var mid = Math.floor(arr.length/2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid, arr.length);

  return countInversions(left) + countInversions(right) + countSplitInversions(arr, left, right);
};


// Simple console test:  should output 4
// console.log(countInversions([3,2,4,1]));
var input = fs.readFileSync(__dirname + '/IntegerArray.txt', {encoding: 'utf8'}).trim();
var inputArray = input.split('\n');
inputArray = inputArray.map(function(entry) {
  return parseInt(entry);
});
var inversions = countInversions(inputArray);
console.log(inversions);
