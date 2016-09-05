var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});

    // Compare Passwords and Usernames here from the table of Users
    // res.redirect('/users')

var credits = [];
connection.query("SELECT * FROM Users", function(err, Users){
  if(err) return console.log(err);
	console.log(Users);
  Users.forEach(function(item){
    var result = {
      Username : item.Username,
      Password : item.Password
    }
    credits.push(result);
  })
});
console.log("credits ------------------");
console.log(credits);

var users_credits = [];

exports.add2 = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body
		var data = {
			Username : input.Username,
			Password : input.Password,
		};
		users_credits.push(data);
	});
};
console.log("users_credits --------");
console.log(users_credits);

users_credits.forEach(function(item){
	credits.forEach(function(item2){
		// if(item.Username == item2.Username){
		// 	console.log("Access Grandted");
		// }
		console.log(item.Username);
	})
});
connection.end();

// res.redirect('/users')
