'use strict';
var express = require('express'),
    flash = require('express-flash'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    bcrypt = require('bcryptjs'),
    session = require('express-session'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    categories = require('./routes/categories'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    purchases = require('./routes/purchases'),
    users = require('./routes/users'),
    mid = require('./middleware'),
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

var showNavBar = true;

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ----------Andre 1--------------------
app.use(function(req, res, next){
  // console.log("in the middleware !");
  next();
});

var rolesMap = {
  "Nelisa101" : "admin",
  "Xolani" : "user"
}

//Set Up HttpSession Middleware
app.use(session({secret: 'passme a cookie', resave : true, saveUninitialized : false, cookie: {maxAge: 600000}}));
//Make userID available in all templates / Creating Middleware ---------------
app.use(function(req, res, next){
  res.locals.currentUser = req.session.userID;
  next();
});

app.post('/', function(req, res){

});

app.use(express.static(__dirname + '/public'));
app.use(flash()); // for flash messages
app.use(myConnection(mysql, dbOptions, 'single'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//---------------------------TreeHouse------------------
//GET /register
app.get("/register", mid.loggedOut, function(req, res, next){
  res.render("register");
});

//POST /register
app.post("/register/add",mid.registered, users.show);


app.get("/",function(req, res) {
  res.redirect("/home");
});

app.get("/login",mid.loggedOut, function(req, res) {
  res.render("login", {
    showNavBar: false
  });
});
var checkUser = function(req, res, next) {
  if(req.session.user){
    return next();
  }
  res.redirect("/login");
};

app.post("/login", function(req, res, next){
  var user1 = [];
  if(req.body.username){
    var user = {
      name : req.body.username,
      pass : req.body.password
    }
    user1.push(user);

    req.getConnection(function(err, connection) {
      connection.query("SELECT * FROM Users", [], function(err, dbUsers) {
        if (err) return next(err);
        console.log("My Users DTBS Usernames------------");
        dbUsers.forEach(function(item){
          user1.forEach(function(item2){
            if(item.username == item2.name && item.password == item2.pass){
              req.session.user = {
                name : req.body.username,
                is_admin : rolesMap[req.body.username] === "admin",
                user : rolesMap[req.body.username] === "user"
              };
              console.log(req.session.user);
              res.redirect("/home");
            }
            if(item.username == item2.name && item.password !== item2.pass){
              req.flash("warning", 'Wrong Password');
              return res.redirect("/login");
            }
          })
        });
      });
    });
  }
  else {
    req.flash("warning", 'Email and Password are required.');
    return res.redirect("/login");
  }
});

app.get("/home", checkUser, function(req, res) {
  res.render("home", {
    user: req.session.user,
    is_admin: req.session.user.is_admin
  })
});

//Why not ideal ? |-----Delete the User----|
app.get("/logout", function(req, res) { // To authenticate logging out
  delete req.session.user;
  res.redirect("/login");
});

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.get('/categories',mid.requiresLogin, categories.show);
app.get('/categories/add',mid.requiresLogin, categories.showAdd);
app.get('/categories/edit/:id',mid.requiresLogin, categories.get);
app.post('/categories/update/:id',mid.requiresLogin, categories.update);
app.post('/categories/add',mid.requiresLogin, categories.add);
app.get('/categories/check/:id',mid.requiresLogin, categories.check);

app.get('/products',mid.requiresLogin, products.show);
app.get('/products/edit/:id',mid.requiresLogin, products.get);
app.post('/products/update/:id',mid.requiresLogin, products.update);
app.get('/products/add',mid.requiresLogin, products.showAdd);
app.post('/products/add',mid.requiresLogin, products.add);
app.get('/products/delete/:id',mid.requiresLogin, products.delete);

app.get('/sales',mid.requiresLogin, sales.show);
app.get('/sales/add',mid.requiresLogin, sales.showAdd);
app.get('/sales/edit/:id',mid.requiresLogin, sales.get);
app.post('/sales/update/:id',mid.requiresLogin, sales.update);
app.post('/sales/add',mid.requiresLogin, sales.add);
app.get('/sales/delete/:id',mid.requiresLogin, sales.delete);

app.get('/purchases',mid.requiresLogin, purchases.show);
app.get('/purchases/add',mid.requiresLogin, purchases.showAdd);
app.get('/purchases/edit/:id',mid.requiresLogin, purchases.get);
app.post('/purchases/update/:id',mid.requiresLogin, purchases.update);
app.post('/purchases/add',mid.requiresLogin, purchases.add);
app.get('/purchases/delete/:id',mid.requiresLogin, purchases.delete);

app.get('/users',mid.requiresLogin,mid.requiresLoginAsAdmin, users.show);
app.get('/users/add',mid.requiresLogin, users.showAdd);
app.post('/users/add',mid.requiresLogin, users.add);
app.get('/users/edit/:user_id',mid.requiresLogin, users.get);
app.post('/users/update/:user_id',mid.requiresLogin, users.update);
app.get('/users/delete/:user_id',mid.requiresLogin, users.delete);

// create a new middleware component-----------------
app.get('/Sales/:week_name',mid.requiresLogin, function(req, res){
  var weekname = req.params.week_name;
  var weeklyFile = "./files/"  + weekname +".csv";
  var data = weeklyStats(weeklyFile, "./files/purchases.csv");
  res.render( "weeklyStats", {key : data , week : weekname, user: req.session.user,
  is_admin: req.session.user.is_admin});
});
app.use(errorHandler);
var portNumber = process.env.CRUD_PORT_NR || 5000;
app.listen(portNumber, function () {
  console.log('Server listening on:', portNumber);
});
