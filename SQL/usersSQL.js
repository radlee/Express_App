// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});
// connection.connect();
var sql = "INSERT INTO Users (Username, Password) VALUES ?"
var Users =[
  ["LEE", "196"],
  ["MACKMAN2", "183"],
  ["GRAND_101", "953"],
  ["MASTER_", "593"]
];
//Insert Query ---
connection.query(sql, [Users], function(err){
  if(err) throw err;
});

connection.query("SELECT * FROM Users", function(err, result){
  if(err){
    console.log(err);
    return;
  }
  // console.log(result);
});
connection.end();
