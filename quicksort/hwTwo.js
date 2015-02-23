/******************************************************************************
 * The file contains all of the integers between 1 and 10,000 (inclusive, with no repeats) in unsorted order. 

DIRECTIONS FOR THIS PROBLEM:

Compute the number of comparisons (as in Problem 1), always using the final element of the
given array as the pivot element. Again, be sure to implement the Partition subroutine 
exactly as it is described in the video lectures. Recall from the lectures that, just before the main 
Partition subroutine, you should exchange the pivot element (i.e., the last element) with the first element.


Becuase I abstracted out the pickPivot function, all I changed in this file is one line in that function
 *****************************************************************************/

var input = require('./getInputArray');
console.log(input.length);

var comparisonCount = 0;

// For this problem we just pick the initial element
var pickPivot = function(arr, lo, hi) {
  return hi-1;
};

var swap = function(arr, i, j) {
  var temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
  temp = null;
};
 
 
var partition = function(arr, lo, hi) {
  var pivotIndex = pickPivot(arr, lo, hi);
  var pivotValue = arr[pivotIndex];
  swap(arr, pivotIndex, lo);
  pivotIndex = lo;

  // part will keep track of the first element greater than the pivot in the portion we have already partitioned
  var part = lo+1;

  for (var i = lo+1; i < hi; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, part);
      part++;
    }
  }

  swap(arr, pivotIndex, part-1);
  pivotIndex = part-1;

  return pivotIndex;
};


var quicksort = function(arr, lo, hi) {
  lo = (lo === undefined ? 0 : lo);
  hi = (hi === undefined ? arr.length : hi);

  if (hi <=lo) return;

  // For each iteration, we make n-1 comparisions, which is equal to hi index minus lo index;
  comparisonCount += hi-lo-1;

  // Partition returns the final pivot location;
  var pivot = partition(arr, lo, hi);

  quicksort(arr, lo, pivot);
  quicksort(arr, pivot+1, hi);
};

quicksort(input);

console.log(comparisonCount);

