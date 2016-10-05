// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');
var readAndMakeObjects = require("../Modules/readAndMakeObjects");
var getCategories = require("../Modules/getCategories");
var getProductNamesAndCategoryNames = require("../Modules/getProductNamesAndCategoryNames");

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});
// connection.connect();
var mapOfProducts = readAndMakeObjects("../files/Week1.csv");
var arrayOfCategories = getCategories(mapOfProducts);
var productNamesAndCategoryNames = getProductNamesAndCategoryNames(arrayOfCategories);

var categoryNamesAndCategoryIDs = [];
connection.query("SELECT * FROM Categories", function(err, Categories){
  if(err) return console.log(err);

  Categories.forEach(function(item){
    var result = {
      Category : item.Category,
      CategoryID : item.id
    }
    categoryNamesAndCategoryIDs.push(result);
  })

  var productNameAndCategoryID =[];
  productNamesAndCategoryNames.forEach(function(item){
    categoryNamesAndCategoryIDs.forEach(function(item2){
      if(item.Category == item2.Category){
        var result = {
          Product : item.Product,
          CategoryID : item2.CategoryID,
          Date : item.Date,
          Quantity : item.Quantity,
          Price : item.Price.replace(/R/g, "")
        }
        productNameAndCategoryID.push(result);
      }
    })
  });

  var mapOfProductAndCategoryID = [];
  var checkDuplicates = {};
  productNameAndCategoryID.forEach(function(item){
    if(checkDuplicates[item.Product] == undefined){
      checkDuplicates[item.Product] = "";
    }
    checkDuplicates[item.Product] = item.CategoryID;
  });

  for(var key in checkDuplicates){
    var result = {
      Product : key,
      CategoryID : checkDuplicates[key]
    }
    mapOfProductAndCategoryID.push(result);
  }
  var values =[];
  mapOfProductAndCategoryID.forEach(function(item){
    var result = [
      item.Product, item.CategoryID
    ]
    values.push(result);
  })

  connection.query("INSERT INTO Products (Product, CategoryID) VALUES ?", [values], function(err){
    if(err) throw err;
  });

  connection.query("SELECT * FROM Products", function(err, result){
    if(err){
      console.log(err);
      return;
    }
    // console.log(result);
  });
  connection.end();

});
