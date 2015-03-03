(function() {
  'use strict';

  var countResult = 0;

  var fs = require('fs');
  var inputText = fs.readFileSync(__dirname + '/input.txt', {encoding: 'utf8'});
  var inputArray = inputText.split('\n');
  inputArray.pop();

  var hash = {};
  // console.log(inputArray.length);

  // console.log(typeof parseInt(inputArray[0]));

  inputArray = inputArray.map(function(str) {
    var num = parseInt(str);
    hash[num] = num;

    return num;
  });


  for(var target = -10000; target < 10000; target++) {
    Object.keys(hash).forEach(function(num) {
      if (hash[target - parse]) {
        countResult++;
        console.log(countResult);
      }      
    });
  }


  console.log('result: ' + countResult);
  

})();
