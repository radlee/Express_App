module.exports = function(file){
  var fs = require('fs');
  var data = fs.readFileSync(file, 'utf8');
  var listOfSplittedLines = data.split("\n").splice(1).filter(Boolean);
  var list =[];
  var listOfObjs = [];
  listOfSplittedLines.forEach(function(line){
    var splittedLine = line.split(",");
    list.push(splittedLine);
    var result = {
      Date : splittedLine[1],
      Item : splittedLine[2],
      Quantity : Number(splittedLine[3]),
      Price : splittedLine[4]
    }
    listOfObjs.push(result);
  })
  return listOfObjs;
}
