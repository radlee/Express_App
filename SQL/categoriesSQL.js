// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});
// connection.connect();
var sql = "INSERT INTO Categories (Category) VALUES ?"
var Categories =[
  ["Dairy"],
  ["Fruits"],
  ["Food"],
  ["Gifts"],
  ["Candy"],
  ["CoolDrink"],
  ["Beauty"],
  ["Bakery"]
];
//Insert Query ---
connection.query(sql, [Categories], function(err){
  if(err) throw err;
});

connection.query("SELECT * FROM Categories", function(err, result){
  if(err){
    console.log(err);
    return;
  }
  // console.log(result);
});
connection.end();
