// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});
// connection.connect();
var sql = "INSERT INTO Users (Username, Password, Email, is_admin) VALUES ?"
var Users =[
  ["LEE", "196", "lee@lee.com", "true"],
  ["MACKMAN2", "183", "lae@lee.com", "false"],
  ["GRAND_101", "953", "lde@lee.com", "false"],
  ["MASTER_", "593", "lea@lee.com", "false"]
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
