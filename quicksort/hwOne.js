/******************************************************************************
 * The file contains all of the integers between 1 and 10,000 (inclusive, with no repeats) in unsorted order. 
 The integer in the ith row of the file gives you the ith entry of an input array.

Your task is to compute the total number of comparisons used to sort the given input file by QuickSort. 
As you know, the number of comparisons depends on which elements are chosen as pivots, 
so we'll ask you to explore three different pivoting rules.
You should not count comparisons one-by-one. Rather, when there is a recursive call on a subarray of length m, 
you should simply add m−1 to your running total of comparisons. 
(This is because the pivot element is compared to each of the other m−1 elements in the subarray in this recursive call.)

WARNING: The Partition subroutine can be implemented in several different ways, and different implementations can give you 
differing numbers of comparisons. For this problem, you should implement the Partition subroutine exactly as it is 
described in the video lectures (otherwise you might get the wrong answer).

DIRECTIONS FOR THIS PROBLEM:

For the first part of the programming assignment, you should always use the first element of the array as the pivot element.

 *****************************************************************************/

var input = require('./getInputArray');
console.log(input.length);

var comparisonCount = 0;

// For this problem we just pick the initial element
var pickPivot = function(arr, lo, hi) {
  return lo;
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

