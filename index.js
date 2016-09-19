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
  console.log("in the middleware !");
  next();
});

var rolesMap = {
  "Nelisa" : "admin",
  "lee" : "view"
}

//Set Up HttpSession Middleware
app.use(session({secret: 'passme a cookie',cookie: {maxAge: 600000}}));
app.post('/', function(req, res){

});

app.use(express.static(__dirname + '/public'));
app.use(flash()); // for flash messages
app.use(myConnection(mysql, dbOptions, 'single'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/",function(req, res) {
  res.redirect("home");
});

var checkUser = function(req, res, next) {
  if(req.session.user){
    return next();
  }
  res.redirect("/login");
};

app.post("/login", function(req, res){
  req.session.user = {
    name : req.body.Username,
    is_admin : rolesMap[req.body.Username] === "admin"
  };
  res.redirect("/home");
})

app.get("/home", checkUser, function(req, res) {
  res.render("home", {
    showNavBar: req.session.user.showNavBar,
    user: req.session.user,
    is_admin: req.session.user.is_admin
  })
});

app.post("/login", function(req, res, next) {
  var parm = req.body.Username;
  var sql = "SELECT * FROM Users WHERE Username = ? ";
  req.getConnection(function(err, connection) {
    connection.query(sql, [parm], function(err, dbUsers) {
      if (err) return next(err);
      console.log(dbUsers);
      var dbUsers = dbUsers[0];
      if (dbUsers === undefined) {
        req.flash("warning", 'Invalid username');
        return res.redirect("/login");
      };
      if (dbUsers.Password !== req.body.Password) { // checks to see if the passwords match
        req.flash('warning', "Your password is invalid");
        return res.redirect("/login");
      };
      if (dbUsers.is_admin === "admin") {
        req.session.user = {
          username: req.body.Username,
          is_admin: true,
          showNavBar: true
        };
        adminAccess = req.session.user.is_admin;
        console.log("1)dbUsers.is_admin :" + adminAccess + " showNavBar : " + showNavBar);
      }
      else {
        req.session.user = {
          username: req.body.Username,
          is_admin: false,
          showNavBar: true
        };
        adminAccess = req.session.user.is_admin;
        console.log("2)dbUsers.is_admin :" + adminAccess + " showNavBar : " + showNavBar);
      };

      var allowedToLogin = false; // variable reset for allowing a user to go to login page
      if (req.session.user.username.trim() === req.body.Username) { // if the form username matches with the database username , gets rid of the whitespaces
        allowedToLogin = true;
      };
      if (allowedToLogin) { // if the user is found on the database , allow him or her to login
        res.redirect("/home"); // go home
      } else {
        res.redirect("/login"); // else redirect back to the login page
      };
    });
  });
});

app.get("/login", function(req, res) {
  res.render("login", {
    showNavBar: false
  });
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

app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.post('/categories/add', categories.add);
app.get('/categories/check/:id', categories.check);


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

app.get('/users', users.show);
app.get('/users/add', users.showAdd);
app.post('/users/add', users.add);
app.get('/users/edit/:user_id', users.get);
app.post('/users/update/:user_id', users.update);
app.get('/users/delete/:user_id', users.delete);


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
