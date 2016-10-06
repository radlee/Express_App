module.exports = function(file){
  var fs = require('fs');
  var data = fs.readFileSync(file, 'utf8');
  var listOfSplittedLines = data.split("\n").splice(1).filter(Boolean);
  var list =[];
  var listOfObjs = [];
  listOfSplittedLines.forEach(function(line){
    var splittedLine = line.split(",");
    list.push(splittedLine);

    var date = splittedLine[1] + -2016;
    var date2 =  new Date(date);
    var simpleDate = date2.getFullYear() + '/' + (date2.getMonth() + 1) + '/' + date2.getDate();


    var result = {
      Date : simpleDate,
      Item : splittedLine[2],
      Quantity : Number(splittedLine[3]),
      Price : splittedLine[4]
    }
    listOfObjs.push(result);
  })
  return listOfObjs;
}
