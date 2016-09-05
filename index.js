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
    users = require('./routes/users'),
    // weeklyData = require('./routes/getWeeklyData'),
    // login = require('./routes/login'),
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

// console.log(weeklyData);
var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'Leander247365',
      port: 3306,
      database: 'Nelisa'
};

var session = require('express-session');

//set up HttpSession middleware
app.use(session({
    secret: 'put your secret phrase here please',
    cookie: { maxAge: 60000 }
}));

// //in a route-----------------------------------------------------------
// app.get("users", function(req, res){
//     if (!req.session.user){
//         req.session.user = req.body.Username;
//     }
// });
//
// //set up HttpSession middleware
// app.use(session({
//     secret: 'put your secret phrase here please',
//     cookie: { maxAge: 60000 }
// }));
//
// app.use(function(req, res, next){
//   console.log('in my middleware!');
//   if (req.path != "/login"){
//       if (!req.session.username ){
//           // redirects to the login screen
//           return res.redirect("/login");
//       }
//   }
//   next();
// });
// -----------------------------------------------------------------
//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers

app.get('/mobile', function(req, res){
    res.render( "mobile");
});
app.get('/login', function(req, res){
    res.render( "login");
});

app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.post('/categories/add', categories.add);
app.post('/users/add2', users.add2);
// //this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/check/:id', categories.check);


app.get('/', function(req, res){
    res.render( "home")
});
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);

//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);
// app.get('sales/Week1', data);

app.get('/sales', sales.show);
app.get('/sales/add', sales.showAdd);
app.get('/sales/edit/:id', sales.get);
app.post('/sales/update/:id', sales.update);
app.post('/sales/add', sales.add);
// //this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/sales/delete/:id', sales.delete);

app.get('/purchases', purchases.show);
app.get('/purchases/add', purchases.showAdd);
app.get('/purchases/edit/:id', purchases.get);
app.post('/purchases/update/:id', purchases.update);
app.post('/purchases/add', purchases.add);
// //this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/purchases/delete/:id', purchases.delete);
// app.get('/login', login.checkUser);
// create a new middleware component------------------------------------------
app.get('/Sales/:week_name', function(req, res){
  var weekname = req.params.week_name;
  console.log(weekname);
  var weeklyFile = "./files/"  + weekname +".csv";
  var data = weeklyStats(weeklyFile, "./files/purchases.csv");
    res.render( "weeklyStats", {key : data , week : weekname});
});

app.get('/users', function(req, res){
  res.render('users');
});
// app.get('/users', checkUser, function(req, res){
//   var userData = userService.getUserData();
//   res.render('/users', userData)
// });


app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 5000;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});
