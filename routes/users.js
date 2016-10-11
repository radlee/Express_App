exports.show = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from Users', [], function(err, results) {
      if (err) return next(err);
      res.render('users', {
        no_users : results.length === 0,
				users : results,
        user: req.session.user,
			  is_admin: req.session.is_admin
      });
    });
  });
};

exports.authenticate = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from Users', [], function(err, results) {
    });
  });
};

const showAddScreen = function(req, res, userData){
	res.render('register', {user: req.session.user,
		is_admin: req.session.user.is_admin,
		userData : userData
	});
}

exports.showAdd = function(req, res) {
  showAddScreen(req, res, {});
}

var rolesMap = {
  "Nelisa101" : "admin",
  "Xolani" : "user"
}

//Get Users from the Database and Compare iff there are same Usernames or Emails

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    connection.query("SELECT * FROM Users", [], function(err, dbUsers) {
      if (err) return next(err);
      var input = [];
      dbUsers.forEach(function(item){
        var result = {name : item.username, email : item.email}
        input.push(result);
      });

    if(req.body.email && req.body.username && req.body.password && req.body.password_confirm){
      var userData = {
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
      };
      req.session.user = {
        name : req.body.username,
        is_admin : rolesMap[req.body.username] === "admin",
        user : rolesMap[req.body.username] === "user"
      };
      if(req.body.password !== req.body.password_confirm){
        req.flash("warning", 'Passwords do not match.');
        return res.render("register", {userData : userData});
      }
    }
    else{
      req.flash("warning", '* All fields required *');
      return res.render("register", {userData : userData});
    }
      connection.query('insert into Users set ?', [userData], function(err, results) {
        if (err) return next(err);
        req.session.user_id = userData.id;

        res.redirect('/');
      });
  });
});
};



exports.get = function(req, res, next) {
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM Users WHERE user_id = ?', [id], function(err, result) {
      if (err) return next(err);
      res.render('edit_user', {
        data: result[0]
      });
    });
  });
};

exports.update = function(req, res, next) {

  var data = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('UPDATE Users SET ? WHERE user_id = ?', [data, id], function(err, rows) {
      if (err) next(err);
      res.redirect('/users');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM Users WHERE user_id = ?', [id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/users');
    });
  });
};
