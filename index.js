'use strict';
var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    session = require('express-session'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    categories = require('./routes/categories'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    purchases = require('./routes/purchases'),
    app = express();
    var readAndMakeObjects = require("./Modules/readAndMakeObjects");
    var getMostPopularProduct = require("./Modules/getMostPopularProduct");
    var getLeastPopularProduct = require("./Modules/getLeastPopularProduct");
    var getMostPopularCategory = require("./Modules/getMostPopularCategory");
    var getLeastPopularCategory = require("./Modules/getLeastPopularCategory");
    var getMostProfitableCategory = require("./Modules/getMostProfitableCategory");
    var getMostProfitableProduct = require("./Modules/getMostProfitableProduct");
    var getArrayOfItemsAndProfits = require("./Modules/getArrayOfItemsAndProfits");
    var getCategories = require("./Modules/getCategories");
    var getSales = require("./Modules/getSales");
    var getCosts = require("./Modules/getCosts");
    var getProductNamesAndCategoryNames = require("./Modules/getProductNamesAndCategoryNames");
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
var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'Leander247365',
      port: 3306,
      database: 'Nelisa'
};
//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
//setup the handlers
app.get('/login', function(req, res){
    res.render( "login");
});
app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.post('/categories/add', categories.add);
app.get('/categories/check/:id', categories.check);

app.get('/', function(req, res){
    res.render( "home")
});
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/delete/:id', products.delete);

app.get('/sales', sales.show);
app.get('/sales/add', sales.showAdd);
app.get('/sales/edit/:id', sales.get);
app.post('/sales/update/:id', sales.update);
app.post('/sales/add', sales.add);
app.get('/sales/delete/:id', sales.delete);

app.get('/purchases', purchases.show);
app.get('/purchases/add', purchases.showAdd);
app.get('/purchases/edit/:id', purchases.get);
app.post('/purchases/update/:id', purchases.update);
app.post('/purchases/add', purchases.add);
app.get('/purchases/delete/:id', purchases.delete);

// create a new middleware component-----------------
app.get('/Sales/:week_name', function(req, res){
  var weekname = req.params.week_name;
  console.log(weekname);
  var weeklyFile = "./files/"  + weekname +".csv";
  var data = weeklyStats(weeklyFile, "./files/purchases.csv");
    res.render( "weeklyStats", {key : data , week : weekname});
});
app.use(errorHandler);
//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 5000;

//start everything up
app.listen(portNumber, function () {
    console.log('Server listening on:', portNumber);
});
