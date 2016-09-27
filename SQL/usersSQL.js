// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});
// connection.connect();
var sql = "INSERT INTO Users (username, password, email) VALUES ?"
var Users =[
  ["LEE", "196", "lee@lee.com"],
  ["MACKMAN2", "183", "lae@lee.com"],
  ["GRAND_101", "953", "lde@lee.com"],
  ["Xolani", "123", "xolani@nelisa.co.za"],
  ["Nelisa101", "112", "nelisa@nelisa.co.za"]
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
