exports.show = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from Users', [], function(err, results) {
      // console.log("results--------------");
      // console.log(results);
      if (err) return next(err);
      res.render('users', {
        no_users : results.length === 0,
				users : results,
      });
    });
  });
};

exports.authenticate = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from Users', [], function(err, results) {
      console.log("results--------------");
      console.log(results);
    });
  });
};

exports.showAdd = function(req, res) {
  res.render('add_user');
}

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if(req.body.email &&
       req.body.username &&
       req.body.password &&
       req.body.password_confirm){
        if(req.body.password !== req.body.password_confirm){
          var err = new Error("Passwords do not match");
          err.status = 400;
          return next(err);
        }
        var userData = {
          email : req.body.email,
          username : req.body.username,
          password : req.body.password
        };
    }
    else{
      var err = new Error("All fields required");
      err.status = 400;
      return next(err);
    }
      connection.query('insert into Users set ?', [userData], function(err, results) {
        if (err) return next(err);
        req.session.user_id = userData.id;

        res.redirect('/users');
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
