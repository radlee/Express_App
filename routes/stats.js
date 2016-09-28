var readAndMakeObjects = require("../Modules/readAndMakeObjects");
var getMostPopularProduct = require("../Modules/getMostPopularProduct");
var getLeastPopularProduct = require("../Modules/getLeastPopularProduct");
var getMostPopularCategory = require("../Modules/getMostPopularCategory");
var getLeastPopularCategory = require("../Modules/getLeastPopularCategory");
var getMostProfitableCategory = require("../Modules/getMostProfitableCategory");
var getMostProfitableProduct = require("../Modules/getMostProfitableProduct");
var getArrayOfItemsAndProfits = require("../Modules/getArrayOfItemsAndProfits");
var getCategories = require("../Modules/getCategories");
var getSales = require("../Modules/getSales");
var getCosts = require("../Modules/getCosts");
var getProductNamesAndCategoryNames = require("../Modules/getProductNamesAndCategoryNames");
var weeklyStats = function(weekPath, purchasesPath){
  var listOfObjects = readAndMakeObjects(weekPath);
  // Weekly Sales and Weekly Purchases Lists Of Objects ----
  var objArray1 = getSales(weekPath);
  var objArray2 = getCosts(purchasesPath);
  var arrayOfProfits = getArrayOfItemsAndProfits(objArray1, objArray2);
  var mostPopularCategory = getMostPopularCategory(listOfObjects);
  var mostPopularProduct = getMostPopularProduct(listOfObjects);
  var leastPopularProduct = getLeastPopularProduct(listOfObjects);
  var leastPopularCategory = getLeastPopularCategory(listOfObjects);
  var mostProfitableProduct = getMostProfitableProduct(objArray1, objArray2);
  var mostProfitableCategory = getMostProfitableCategory(arrayOfProfits);
  var arrayOfCategories = getCategories(listOfObjects);
  return [mostPopularProduct, leastPopularProduct, mostPopularCategory, leastPopularCategory, mostProfitableProduct, mostProfitableCategory];
}
exports.show = function(req, res, next){
  // if(err) return next(err);
  var weekname = req.params.week_name;
  var weeklyFile = "./files/"  + weekname +".csv";
  var data = weeklyStats(weeklyFile, "./files/purchases.csv");
  res.render( "weeklyStats", {key : data , week : weekname, user: req.session.user,
  is_admin: req.session.user.is_admin});
}
