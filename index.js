'use strict';
var express = require('express'),
    flash = require('express-flash'),
    moment = require('moment'),
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
    stats = require('./routes/stats'),
    mid = require('./middleware'),
    app = express();

    moment().format();


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
app.get("/register", mid.loggedOut, function(req, res, next){
  res.render("register");
});
app.get("/login",mid.loggedOut, function(req, res) {
  res.render("login", {
    showNavBar: false
  });
});

app.post("/users/add",mid.registered, users.add);


app.get("/",function(req, res) {
  res.redirect("/home");
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
app.get("/logout", function(req, res) {
  delete req.session.user;
  res.redirect("/login");
});

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.get('/categories',mid.requiresLogin, categories.show);
app.get('/categories/add',mid.requiresLogin,mid.requiresLoginAsAdmin, categories.showAdd);
app.get('/categories/edit/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, categories.get);
app.post('/categories/update/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, categories.update);
app.post('/categories/add',mid.requiresLogin,mid.requiresLoginAsAdmin, categories.add);
app.get('/categories/check/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, categories.check);

app.get('/products',mid.requiresLogin, products.show);
app.get('/products/edit/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, products.get);
app.post('/products/update/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, products.update);
app.get('/products/add',mid.requiresLogin,mid.requiresLoginAsAdmin, products.showAdd);
app.post('/products/add',mid.requiresLogin,mid.requiresLoginAsAdmin, products.add);
app.get('/products/delete/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, products.delete);

app.get('/sales',mid.requiresLogin, sales.show);
app.get('/sales/add',mid.requiresLogin,mid.requiresLoginAsAdmin, sales.showAdd);
app.get('/sales/edit/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, sales.get);
app.post('/sales/update/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, sales.update);
app.post('/sales/add',mid.requiresLogin,mid.requiresLoginAsAdmin, sales.add);
app.get('/sales/delete/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, sales.delete);

app.get('/purchases',mid.requiresLogin, purchases.show);
app.get('/purchases/add',mid.requiresLogin,mid.requiresLoginAsAdmin, purchases.showAdd);
app.get('/purchases/edit/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, purchases.get);
app.post('/purchases/update/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, purchases.update);
app.post('/purchases/add',mid.requiresLogin,mid.requiresLoginAsAdmin, purchases.add);
app.get('/purchases/delete/:id',mid.requiresLogin,mid.requiresLoginAsAdmin, purchases.delete);

app.get('/users',mid.requiresLogin, mid.requiresLoginAsAdmin, users.show);
app.get('/users/add',mid.requiresLogin,mid.requiresLoginAsAdmin, users.showAdd);
app.post('/users/add',mid.requiresLogin,mid.requiresLoginAsAdmin, users.add);
app.get('/users/edit/:user_id',mid.requiresLogin,mid.requiresLoginAsAdmin, users.get);
app.post('/users/update/:user_id',mid.requiresLogin,mid.requiresLoginAsAdmin, users.update);
app.get('/users/delete/:user_id',mid.requiresLogin,mid.requiresLoginAsAdmin, users.delete);

app.get('/:week_name',mid.requiresLogin, stats.show);
app.use(errorHandler);

var portNumber = process.env.CRUD_PORT_NR || 5000;
app.listen(portNumber, function () {
  console.log('Server listening on:', portNumber);
});
