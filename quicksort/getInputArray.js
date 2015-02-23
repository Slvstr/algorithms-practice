var fs = require('fs');

var input = fs.readFileSync(__dirname + '/input.txt', {encoding: 'utf8'}).trim();
var inputArray = input.split('\n');
var returnArray = inputArray.map(function(entry) {
  return parseInt(entry);
});

module.exports = returnArray;