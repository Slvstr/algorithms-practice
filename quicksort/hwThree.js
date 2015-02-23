/******************************************************************************
DIRECTIONS FOR THIS PROBLEM:

Compute the number of comparisons (as in Problem 1), using the "median-of-three" pivot rule. 
[The primary motivation behind this rule is to do a little bit of extra work to get much better 
performance on input arrays that are nearly sorted or reverse sorted.] In more detail, you should 
choose the pivot as follows. Consider the first, middle, and final elements of the given array. 
(If the array has odd length it should be clear what the "middle" element is; for an array with even 
length 2k, use the kth element as the "middle" element. So for the array 4 5 6 7, the "middle" 
element is the second one ---- 5 and not 6!) Identify which of these three elements is the median 
(i.e., the one whose value is in between the other two), and use this as your pivot. As discussed in 
the first and second parts of this programming assignment, be sure to implement Partition exactly as 
described in the video lectures (including exchanging the pivot element with the first element just before 
the main Partition subroutine).

EXAMPLE: For the input array 8 2 4 5 7 1 you would consider the first (8), middle (4), and last (1) elements; 
since 4 is the median of the set {1,4,8}, you would use 4 as your pivot element.

SUBTLE POINT: A careful analysis would keep track of the comparisons made in identifying the median of the three 
candidate elements. You should NOT do this. That is, as in the previous two problems, you should simply add m−1 to 
your running total of comparisons every time you recurse on a subarray with length m.

 *****************************************************************************/

var input = require('./getInputArray');

var comparisonCount = 0;

// For this problem we just pick the initial element
var pickPivot = function(arr, lo, hi) {
  var first = arr[lo];
  var last = arr[hi-1];
  var midIndex = Math.floor((hi-lo-1)/2) + lo;
  var mid = arr[midIndex];

  var min = Math.min(first, last, mid);
  var max = Math.max(first, last, mid);

  if (first > min && first < max) {
    return lo;
  }
  else if (last > min && last < max) {
    return hi-1;
  }
  else {
    return midIndex;
  }

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

