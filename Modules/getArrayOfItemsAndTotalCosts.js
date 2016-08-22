var readAndMakeObject = function(file){
  var fs = require('fs');
  var data = fs.readFileSync(file, 'utf8');
  var listOfSplittedLines = data.split("\n").splice(1).filter(Boolean);
  var list =[];
  var listOfObjs = [];
  listOfSplittedLines.forEach(function(line){
    var splittedLine = line.split(";");
    list.push(splittedLine);
    var quantity = splittedLine[3];
    var costPerItem  = splittedLine[4].replace(/R/g, "");
    var totalCost = splittedLine[5].replace(/R/g, "");
    var costPerItem  = costPerItem.replace(",", ".");
    var totalCost = totalCost.replace(",", ".");
    var result = {
      Shop : splittedLine[0],
      Date : splittedLine[1],
      Item : splittedLine[2],
      Quantity : quantity,
      CostPerItem : costPerItem,
      TotalCost : totalCost
      // Quantity : parseInt(quantity),
      // CostPerItem : parseInt(costPerItem),
      // TotalCost : parseInt(totalCost)
    }
    listOfObjs.push(result);
  })
  var objArray = listOfObjs;
  return listOfObjs;

}
var objArray = readAndMakeObject("files/purchases.csv");

// console.log(objArray)

var weekl1Purchases = [];
var weekl2Purchases = [];
var weekl3Purchases = [];
var weekl4Purchases = [];

var week1 =new Date('7-Feb');
var week2 =new Date('14-Feb');
var week3 =new Date('21-Feb');
var week4 =new Date('1-Mar');

objArray.forEach(function(item){
    if(new Date(item.Date) < week1){
      var result ={
        Item : item.Item,
        TotalCost : item.TotalCost
      }
      weekl1Purchases.push(result)
    }
    if(new Date(item.Date) < week2 && new Date(item.Date) > week1){
      var result ={
        Item : item.Item,
        TotalCost : item.TotalCost
      }
      weekl2Purchases.push(result)
    }
    if(new Date(item.Date) < week3 && new Date(item.Date) > week2){
      var result ={
        Item : item.Item,
        TotalCost : item.TotalCost
      }
      weekl3Purchases.push(result)
    }
    if(new Date(item.Date) > week3){
      var result ={
        Item : item.Item,
        TotalCost : item.TotalCost
      }
      weekl4Purchases.push(result)
    }
})
console.log("\nWeek 1 -- > \n");
console.log(weekl1Purchases)
console.log("\nWeek 2 -- > \n");
console.log(weekl2Purchases)
console.log("\nWeek 3 -- > \n");
console.log(weekl3Purchases)
console.log("\nWeek 4 -- > \n");
console.log(weekl4Purchases)

console.log(weekl1Purchases.length + weekl2Purchases.length + weekl3Purchases.length + weekl4Purchases.length);
