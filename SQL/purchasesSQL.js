var fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "password",
  database : "Nelisa"
});

var data = fs.readFileSync("../files/purchases.csv", 'utf8');
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

  var date = splittedLine[1] + -2016;
  var date2 =  new Date(date);
  var simpleDate = date2.getFullYear() + '/' + (date2.getMonth() + 1) + '/' + date2.getDate();

  var result = {
    Shop : splittedLine[0],
    Date : simpleDate,
    Item : splittedLine[2],
    Quantity : quantity,
    CostPerItem : costPerItem,
  }
  listOfObjs.push(result);
})
console.log(listOfObjs);

var productNamesAndProductIDs = [];
connection.query("SELECT * FROM Products", function(err, Products){
  if(err) return console.log(err);

  Products.forEach(function(item){
    var result = {
      Product : item.Product,
      ProductID : item.Product_ID
    }
    productNamesAndProductIDs.push(result);
  })

  var purchasesStats =[];
  listOfObjs.forEach(function(item){
    productNamesAndProductIDs.forEach(function(item2){
      if(item.Item == item2.Product){
        var result = {
          Shop : item.Shop,
          Product : item2.Product,
          Product_ID : item2.ProductID,
          Date : item.Date,
          Quantity : item.Quantity,
          CostPerItem : item.CostPerItem,
        }
       purchasesStats.push(result);
      }
    })
  });
  var values =[];
  //Making a list of a LIST ----
  purchasesStats.forEach(function(item){
    var result = [
      item.Shop, item.Date, item.Quantity, item.CostPerItem, item.Product_ID
    ]
    values.push(result);
  })
  console.log(values);

  connection.query("INSERT INTO Purchases (Shop, Date, Quantity, CostPerItem, ProductID) VALUES ?", [values], function(err){
    if(err) throw err;
  });

  connection.query("SELECT * FROM Purchases", function(err, result){
    if(err){
      console.log(err);
      return;
    }
  });
  connection.end();
});
