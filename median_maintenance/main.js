(function() {
  'use strict';

  var stream = require('./getInputStream');
  var Heap = require('heap');



  // lowerHeap passes comparison function to Heap constructor so it will support Extract-Max
  var lowerHeap = new Heap(function(a,b) { return b - a; });
  var upperHeap = new Heap();

  var medians = [];
  var medianSum = 0;

  while(stream.hasNext()) {
    addItem(stream.next());
    getMedian();
    // console.log('upperHeap size: ' + upperHeap.size() + '\n upperHeap min: ' + upperHeap.peek());
    // console.log('lowerHeap size: ' + lowerHeap.size() + '\n lowerHeap max: ' + lowerHeap.peek());
  }

  medianSum = medians.reduce(function(acc, median){
    return acc + median;
  }, 0);

  console.log(medianSum);



  /******************************************************************************
   * We will keep size of lowerHeap >= upperHeap so getMedian can simply 
   * Extract-Max from that.  
   *****************************************************************************/
  function addItem(num) {
    var lastMedian = medians[medians.length - 1] || num;

    // push onto the appropriate heap.  lastMedian will be max from lower heap.
    (num > lastMedian ? upperHeap : lowerHeap).push(num);


    // Rebalance heaps if necessary.  Lower heap will always be equal in size or 1 item larger.
    if (upperHeap.size() > lowerHeap.size()) {
      lowerHeap.push(upperHeap.pop());
    }

    else if ((lowerHeap.size() - upperHeap.size()) > 1) {
      upperHeap.push(lowerHeap.pop());
    }


  };


  function getMedian() {
    medians.push(lowerHeap.peek());
  }



})();